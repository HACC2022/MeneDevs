const DB = require('./dynamo-db');

module.exports = class LogsDB extends DB {
    /**
     * Loads reports db in dynamo
     */
    constructor() {
        super();

        this.TABLE_NAME = 'Reports';
        this.PARTITION_KEY = 'agency';
        this.SORT_KEY = 'id';
    }

    /**
     * Gives you literally all the reports in the DB
     * @returns {Promise} Promised array of reports
     */
    async getAllReports() {
        return (await this.list(this.TABLE_NAME)).Items;
    }

    /**
     * Gives you reports only for the agency you specified
     * @param {String} agency (Case-sensitive) Whatever agency you want
     * @returns {Promise} Promised array of filtered reports
     */
    async getReportsFor(agency) {
        if (typeof agency != 'string') throw new Error('Expected agency to be a string');

        const reports = await this.getAllReports();
        const sorted = [];

        for (const report of reports) {
            if (report.agency == agency) {
                sorted.push(report);
            }
        }

        return sorted;
    }

    /**
     * Gets a specific report that matches the agency and id provided
     * @param {String} agency The agency tied to the report
     * @param {String} id The id of the report
     * @returns {Promise} Promised report object
     */
    getReport(agency, id) {
        if (typeof agency != 'string') throw new Error('Expected agency to be a string');
        if (typeof id != 'string') throw new Error('Expected id to be a string');

        return this.find({
            TableName: this.TABLE_NAME,
            Key: {
                [this.PARTITION_KEY]: { S: agency },
                [this.SORT_KEY]: { S: id },
            },
        });
    }

    /**
     * Makes a new report from scratch
     * @param {String} agency The name of the agency you want the report tied to
     * @param {Object} info This holds all the report info
     * @param {String} info.stationArea Name of TOD station area
     * @param {String} info.projectName Name of project
     * @param {String} info.totalArea Total area of project (in acres)
     * @param {String} info.location Name of project location
     * @param {?String} info.tmk (optional) Tax Map Key Numbers
     * @param {String} info.phase Project phase [Planning/Pre-planning]
     * @param {String} info.status Project status
     * @param {String} info.date Date of report DD/MM/YYYY
     * @param {String} info.contact Contact information as phone number
     * @param {String} info.email Email address
     */
    createReport(agency, info) {
        if (typeof agency != 'string') throw new Error('Expected agency to be a string');
        if (typeof info != 'object') throw new Error('Expected info to be an object');

        const params = {
            TableName: this.TABLE_NAME,
            Item: {
                [this.PARTITION_KEY]: { S: agency },
                [this.SORT_KEY]: { S: Date.now().toString() },
            },
        };

        for (const [key, value] of Object.entries(info)) {
            params.Item[key] = { S: value.toString() };
        }

        this.put(params);
    }

    /**
     * Adds new info to an existing report
     * @param {String} agency The agency of the report
     * @param {String} id The id of the report
     * @param {Object} newInfo The new info u wanna add
     */
    async updateReport(agency, id, newInfo) {
        if (typeof agency != 'string') throw new Error('Expected agency to be a string');
        if (typeof id != 'string') throw new Error('Expected id to be a string');
        if (typeof newInfo != 'object') throw new Error('Expected newInfo to be an object');

        const report = await this.getReport(agency, id);
        const params = {
            TableName: this.TABLE_NAME,
            Item: {
                [this.PARTITION_KEY]: { S: agency },
                [this.SORT_KEY]: { S: id },
            },
        };

        const add = (object) => {
            for (const [key, value] of Object.entries(object)) {
                params.Item[key] = { S: value.toString() };
            }
        };

        add(report);
        add(newInfo);

        this.put(params);
    }

    /**
     * Gets rid of a report entirely from the DB
     * @param {String} agency The agency of the report
     * @param {String} id The id of the report
     */
    deleteReport(agency, id) {
        if (typeof agency != 'string') throw new Error('Expected agency to be a string');
        if (typeof id != 'string') throw new Error('Expected id to be a string');

        this.remove({
            TableName: this.TABLE_NAME,
            Key: {
                [this.PARTITION_KEY]: { S: agency },
                [this.SORT_KEY]: { S: id },
            },
        });
    }
};
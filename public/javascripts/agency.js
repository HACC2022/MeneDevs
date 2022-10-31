const addReport = document.getElementById('add-button');
const agencyFormQuestions = document.getElementById('agencyFormQuestions');
const headerTable = document.querySelector('tr');
const mainTable = document.getElementById('main-table');

// View Reports Page
if (addReport) {
    // link the add report button to the submit report page
    linkTo(addReport, '/agency/report?create=true');

    // load the table
    initTable(allReports);

    // initialize the sorting thingy
    document.querySelectorAll(".table-content th").forEach(headerCell => {
        headerCell.addEventListener("click", _ => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });
    sortTableByColumn(document.querySelector("table"), 1, false);
}

// Report Page
if (agencyFormQuestions) {
    // populate report form with the saved global questions
    for (const [question, type] of Object.entries(questions)) {
        const types = ['text', 'number', 'text', 'text', 'text'];
        agencyFormQuestions.innerHTML += `
            <p>${question}</p>
            <input id="${question}" class="${type} type="${types[parseInt(type)]}" placeholder="Enter here"" oninput=handleAnswerInputs(this)></input>
        `;
    }
    agencyFormQuestions.innerHTML += `
        <br><br><br>
        <div id="row-container">
            <button id="submitReport" style="background: #27ae60;">Submit</button>
            <button id="deleteReport" style="display: none; background: #e74c3c;">Delete</button>
        </div>
    `;

    const reverse = (str) => str.split('').reverse().join('');
    function handleAnswerInputs(self) {
        const type = self.classList[0];

        // masking for the phone number and currency question types
        if (type == '2') {
            const x = self.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            self.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
        } else if (type == '4') {
            let { value } = self;
            value = value.replace(/[,$\D]/g, '');
            value = reverse(value);
            value = value.replace(/.../g, (e) => `${e},`);
            value = reverse(value);
            value = value.replace(/^,/g, '');
            self.value = value ? `$${value}` : '';
        }
    }

    // Change everything based on whether this is a new or old report
    const url = new URL(window.location.href);
    const submitReport = document.getElementById('submitReport');
    const deleteReport = document.getElementById('deleteReport');

    if (!url.searchParams.get('create')) {
        document.getElementById('agencyFormPageHeader').textContent = 'Edit Your Report';
        submitReport.textContent = 'Save';
        deleteReport.style.display = null;

        for (const [key, value] of Object.entries(report)) {
            const element = document.getElementById(key);
            if (element) element.value = value;
        }
    }

    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const handlePostResponse = async (response) => {
        try {
            response = await response.json();

            if (response == 'success') window.open('/agency', '_self');
            else alert('Something went wrong!');
        } catch (e) {
            console.error(e);
            alert('Something went wrong!');
        }
    };

    const postChanges = async (obj) => {
        const response = await fetch(window.location.origin + window.location.pathname, {
            method: 'POST',
            headers: {
                ['Content-Type']: 'application/json',
            },
            body: JSON.stringify(obj),
        });

        handlePostResponse(response);
    };

    submitReport.addEventListener('click', async _ => {
        // first check if inputs are valid
        for (const input of document.querySelectorAll('input')) {
            const qType = input.classList[0];

            if (
                (qType == '2' && input.value.length != 14) ||
                (qType == '3') && !emailRegex.test(input.value) ||
                input.value == ''
            ) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return alert(`'${input.id}' is invalid!`);
            }

            report[input.id] = input.value;
        }

        postChanges({ create: true, report: report });
    });

    deleteReport.addEventListener('click', _ => {
        if (confirm('Are you sure you want to delete this report?')) postChanges({ delete: true, report: report });
    });
}
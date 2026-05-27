# MeneDevs — HACC 2022 TOD Project Reporting System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen.svg)](https://nodejs.org/)

A secure, dynamic, and lightweight project tracking web application developed by team **MeneDevs** for the **2022 Hawaii Annual Code Challenge (HACC)**. 

This solution is designed for the **Hawaii Department of Transportation (HIDOT)** to coordinate, track, and review state and county infrastructure projects near Transit-Oriented Development (TOD) station areas.



## ✨ Features

### 🏢 Agency Workspace
* **Report Submission**: Agencies can submit detailed project profiles including Agency Name, TOD Station Area, Project Name, Acreage, Location Name, Tax Map Key (TMK) numbers, current Planning Phases, and upload Project Status PDFs.
* **Review & Edit**: Interactive tabular overview of past submissions with options to view details, update fields, or delete outdated reports.

### 👑 Admin Control Panel
* **Consolidated Overview**: View and search all reports submitted across all agencies in a central, interactive data table.
* **Dynamic Form Builder**: Modify report questions and form fields globally. Form updates propagate in real-time to all agency submission surveys without code redeployments.
* **Data Export**: One-click **Download as XLSX** utilizing [SheetJS](https://sheetjs.com/) to process and export project reports into fully styled Excel spreadsheets.

### 🛡️ Security & Performance
* **Role-Based Authentication**: Secure access controls powered by `Passport.js` separating `admin` and `agency` dashboards.
* **Persistent Sessions**: State tracking using secure cookie-based express sessions.
* **AWS DynamoDB Backend**: High-performance, scalable NoSQL datastores utilizing partitioned and sorted indexes.
* **Automated Keep-Alive**: Integrated self-ping system (`no-idle.js`) ensuring minimal cold-starts on Heroku hosting environments.

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Frontend**: Embedded JavaScript (EJS) templates, Vanilla CSS, Frontend JavaScript
* **Database**: AWS DynamoDB (`@aws-sdk/util-dynamodb`, `aws-sdk`)
* **Auth**: Passport.js (Local Strategy), Express-Session, Cookie-Parser
* **Utility Libraries**: SheetJS (`xlsx`), Axios (Keep-Alive requests), Dotenv, Method-Override

---

## 📁 Repository Structure

```text
├── bin/
│   └── www                 # Web server configuration and HTTP startup script
├── routes/
│   ├── index.js            # Main routing gateway (redirects users based on role)
│   ├── login.js            # Authentication handlers
│   ├── profile.js          # User profile management
│   ├── admin.js            # Administrative dashboards and question-management API
│   └── agency.js           # Agency report CRUD API endpoints
├── utils/
│   ├── dynamo-db.js        # Core AWS DynamoDB abstract database client wrapper
│   ├── user-db.js          # DB client for user credential lookups
│   ├── reports-db.js       # DB client for CRUD operations on project reports
│   ├── questions-db.js     # DB client for retrieving and updating global survey fields
│   ├── passport-init.js    # Passport local strategy initialization and serialization
│   └── no-idle.js          # Prevent Heroku application dynos from falling asleep
├── views/
│   ├── admin/              # EJS templates for the Admin interface
│   ├── agency/             # EJS templates for the Agency interface
│   ├── login.ejs           # Main portal authentication view
│   ├── profile.ejs         # User profile views
│   └── error.ejs           # Custom 404 & 500 error page template
├── public/
│   ├── javascripts/        # Client-side table interactive engines & nav handlers
│   ├── stylesheets/        # Global layout grids, lists, custom typography and styles
│   └── images/             # Static graphics and UI assets (logos, controls)
├── app.js                  # Primary Express application initialization, loaders and middlewares
├── Procfile                # Heroku deployment instructions
└── package.json            # NPM dependencies and environments
```

---

## 🔧 Installation & Local Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v14.0.0 or higher recommended)
* [NPM](https://www.npmjs.com/) (installed automatically with Node)
* An active **AWS Account** with DynamoDB setup containing tables:
  * `Users` (Partition key: `email` [S], Sort key: `password` [S])
  * `Reports` (Partition key: `id` [S], Sort key: `email` [S])
  * `Global_Questions` (Partition key: `questions` [S])

### Step-by-Step Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/alohabeach/HACC-2022.git
   cd HACC-2022
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   SESSION_SECRET=your_custom_secure_session_secret
   
   # AWS Config (if not configured globally via AWS CLI)
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-west-2
   ```

4. **Launch the Development Server**
   ```bash
   npm run devStart
   ```
   The application will run locally at `http://localhost:3000` (or the port defined by your environment).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///d:/Documents/VS%20Files/MeneDevs/LICENSE) file for details.

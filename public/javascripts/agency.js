const addReport = document.getElementById('add-button');
const submitReport = document.getElementById('submitReport');
const openReport = document.getElementById('open-button-1');
const editReport = document.getElementById('editReport');

// Open Report Page
if(openReport)
{
    linkTo(openReport, '/agency/view');

}

if(editReport)
{
    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    let inputs = {};
    const inputIds = {
        agency: true,
        stationArea: true,
        projectName: true,
        totalArea: true,
        location: true,
        tmk: false,
        phase: true,
        status: false,
        contact: true,
        email: true,
        budget: false,
    };

    editReport.addEventListener('click', async _ => {
        // reset inputs
        inputs = {};

        for (const [id, required] of Object.entries(inputIds)) {
            const input = id == 'phase' ? document.querySelector('input[name="phase"]:checked') : document.getElementById(id);

            // check if the inputs are valid
            if (required) {
                if (id == 'email' && !emailRegex.test(input.value)) {
                    return alert('Please provide a valid email address.');
                } else if (id == 'contact' && !phoneRegex.test(input.value)) {
                    return alert(`Please provide a valid phone number.`);
                } else if (input?.value == '') {
                    return alert(`Please fill out the ${id} field.`);
                }
            }

            // save the inputs
            inputs[id] = input?.value && input.value.length > 0 ? input.value : null;
        }

        // submit the inputs
        const response = await (await fetch(window.location.href, {
            method: 'POST',
            headers: {
                ['Content-Type']: 'application/json',
            },
            body: JSON.stringify(inputs),
        })).json();

        if (response == 'success') {
            window.open('/agency', '_self');
        } else {
            alert('Something went wrong!');
        }
    });
}

// View Reports Page
if (addReport) {
    linkTo(addReport, '/agency/new');

    window.addEventListener('click', (event) => {
        for (const btn of document.getElementsByClassName('dropbtn')) {
            const dropdown = btn.parentElement.children[1];
            dropdown.classList[event.target.value == btn.value ? 'toggle' : 'remove']('show');
        }
    });

    document.querySelectorAll(".table-content th").forEach(headerCell => {
        headerCell.addEventListener("click", _ => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");
            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });
    sortTableByColumn(document.querySelector("table"), 2, false);
}

// Report Page
if (submitReport) {
    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    const phoneRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    let inputs = {};
    const inputIds = {
        agency: true,
        stationArea: true,
        projectName: true,
        totalArea: true,
        location: true,
        tmk: false,
        phase: true,
        status: false,
        contact: true,
        email: true,
        budget: false,
    };

    submitReport.addEventListener('click', async _ => {
        // reset inputs
        inputs = {};

        for (const [id, required] of Object.entries(inputIds)) {
            const input = id == 'phase' ? document.querySelector('input[name="phase"]:checked') : document.getElementById(id);

            // check if the inputs are valid
            if (required) {
                if (id == 'email' && !emailRegex.test(input.value)) {
                    return alert('Please provide a valid email address.');
                } else if (id == 'contact' && !phoneRegex.test(input.value)) {
                    return alert(`Please provide a valid phone number.`);
                } else if (input?.value == '') {
                    return alert(`Please fill out the ${id} field.`);
                }
            }

            // save the inputs
            inputs[id] = input?.value && input.value.length > 0 ? input.value : null;
        }

        // submit the inputs
        const response = await (await fetch(window.location.href, {
            method: 'POST',
            headers: {
                ['Content-Type']: 'application/json',
            },
            body: JSON.stringify(inputs),
        })).json();

        if (response == 'success') {
            window.open('/agency', '_self');
        } else {
            alert('Something went wrong!');
        }
    });
}
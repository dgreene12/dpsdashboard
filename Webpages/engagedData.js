var engaged = {
    'Service': {
        'Staff/Faculty': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/496250774c6fe9360b4072638b59faf52f7054eb/data/2023/Faculty_Resources.csv',
        'Undergraduate Students': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/45694150d57840b6094c68dfe4d9908a37e9fa35/data/2023/us_service.csv'
    },
    'Teaching and Learning': {
        'Staff/Faculty': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/496250774c6fe9360b4072638b59faf52f7054eb/data/2023/sf_teach.csv',
        'Undergraduate Students': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/496250774c6fe9360b4072638b59faf52f7054eb/data/2023/us_learn.csv'
    },
    'Research': {
        'Staff/Faculty': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/9b05d76952edd104c81a486d7728d3e5252caa2e/data/2023/sf_research.csv',
        'Undergraduate Students': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/496250774c6fe9360b4072638b59faf52f7054eb/data/2023/us_research.csv'
    }
};

function fetchAndDisplayData(tabName, division) {
    var url = engaged[tabName][division];
    fetch(url)
        .then(response => response.text())
        .then(csv => {
            let table = convertCSVToTable(csv);
            document.getElementById(tabName + 'Table').innerHTML = table;
        })
        .catch(error => console.error('Error:', error));
}

function convertCSVToTable(csv) {
    var lines = csv.split("\n");
    var headers = lines[0].split(",").map(header => header.trim());
    
    // Check if headers match the expected headers
    var expectedHeaders = ["School", "Name", "URL", "Description", "Subject"];
    if (!headers.every((header, index) => header === expectedHeaders[index])) {
        console.error("CSV headers do not match the expected format.");
        return "<p>Error: CSV format is incorrect.</p>";
    }

    var result = "<table>";
    
    // Adding headers to the table
    result += "<tr>";
    headers.forEach(header => {
        result += "<th>" + header + "</th>";
    });
    result += "</tr>";

    // Adding data rows to the table
    for (var j = 1; j < lines.length; j++) {
        var cells = lines[j].split(",");
        if (cells.length === headers.length) {
            result += "<tr>";
            cells.forEach(cell => {
                result += "<td>" + cell.trim() + "</td>";
            });
            result += "</tr>";
        }
    }
    result += "</table>";
    return result;
}


function dropdownChanged(tabName, division) {
    fetchAndDisplayData(tabName, division);
}
var engaged = {
    'Service': {
        'Staff/Faculty': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/496250774c6fe9360b4072638b59faf52f7054eb/data/2023/Faculty_Resources.csv',
        'Undergraduate Students': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/496250774c6fe9360b4072638b59faf52f7054eb/data/2023/us_service.csv'
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
    var result = "<table>";
    var headers = lines[0].split(",");

    result += "<tr>";
    for (var i = 0; i < headers.length; i++) {
        result += "<th>" + headers[i].trim() + "</th>";
    }
    result += "</tr>";

    for (var j = 1; j < lines.length; j++) {
        var cells = lines[j].split(",");
        if (cells.length === headers.length) {
            result += "<tr>";
            for (var k = 0; k < cells.length; k++) {
                result += "<td>" + cells[k].trim() + "</td>";
            }
            result += "</tr>";
        }
    }
    result += "</table>";
    return result;
}


function dropdownChanged(tabName, division) {
    fetchAndDisplayData(tabName, division);
}
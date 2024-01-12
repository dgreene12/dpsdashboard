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
        'Undergraduate Students': 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/fedd6071eac41d7737db1a0e7f2d7719ef244e5f/data/2023/us_research.csv'
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

    for (var i = 0; i < lines.length; i++) {
        var row = lines[i];
        var cells = parseCSVLine(row);

        if (i === 0) { // Header row
            result += "<tr>";
            cells.forEach(cell => result += "<th>" + cell.trim() + "</th>");
            result += "</tr>";
        } else { // Data rows
            result += "<tr>";
            cells.forEach(cell => result += "<td>" + cell.trim() + "</td>");
            result += "</tr>";
        }
    }

    result += "</table>";
    return result;
}

function parseCSVLine(line) {
    var cells = [];
    var cell = "";
    var insideQuotes = false;

    for (var i = 0; i < line.length; i++) {
        var char = line[i];

        if (char === '"' && !insideQuotes) {
            // Start of a quoted field
            insideQuotes = true;
            continue;
        }

        if (char === '"' && insideQuotes) {
            if (i + 1 < line.length && line[i + 1] === '"') {
                // Double quote within a quoted field
                cell += '"';
                i++; // Skip next quote
            } else {
                // End of a quoted field
                insideQuotes = false;
            }
            continue;
        }

        if (char === ',' && !insideQuotes) {
            // End of a field
            cells.push(cell);
            cell = "";
        } else {
            cell += char;
        }
    }

    cells.push(cell); // Add last cell
    return cells;
}

function convertCSVToTable(csv) {
    var lines = csv.split("\n");
    var result = "<table>";

    for (var i = 0; i < lines.length; i++) {
        var row = lines[i];
        var cells = parseCSVLine(row);

        result += "<tr>";
        cells.forEach(cell => {
            result += (i === 0 ? "<th>" : "<td>") + cell.trim() + (i === 0 ? "</th>" : "</td>");
        });
        result += "</tr>";
    }

    result += "</table>";
    return result;
}


function dropdownChanged(tabName, division) {
    fetchAndDisplayData(tabName, division);
}
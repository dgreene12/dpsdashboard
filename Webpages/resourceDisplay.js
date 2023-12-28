// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Function to calculate distance between two coordinates in miles
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 3958.8; // Radius of the earth in miles
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1); 
    var a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distance in miles
}

// Main function to display resources near a selected school
function displayResources(schoolName, variableName) {
    var schoolData = schoolCoordinates.find(school => school.name === schoolName);
    if (!schoolData) {
        console.error('School not found:', schoolName);
        return;
    }

    var actualSchoolName = schoolData.name; // Get the actual school name
    var variableData = geospatial.find(variable => variable.name === variableName);
    if (!variableData) {
        console.error('Variable not found:', variableName);
        return;
    }

    fetch(variableData.url)
        .then(response => response.text())
        .then(csvText => {
            var lines = csvText.split("\n");
            var headers = lines[0].split(",");
            var latIndex = headers.indexOf("LATITUDE");
            var lonIndex = headers.indexOf("LONGITUDE");
            var nameIndex = headers.indexOf("name");
            var addressIndex = headers.indexOf("ADDRESS");
            var urlIndex = headers.indexOf("URL");
            var resourcesWithinDistance = [];

            for (var i = 1; i < lines.length; i++) {
                var currentline = lines[i].split(",");
                if (currentline.length > latIndex && currentline.length > lonIndex) {
                    var lat = parseFloat(currentline[latIndex]);
                    var lon = parseFloat(currentline[lonIndex]);
                    if (!isNaN(lat) && !isNaN(lon)) {
                        var distance = calculateDistance(schoolData.coords[0], schoolData.coords[1], lat, lon);
                        if (distance <= 5) {
                            var name = currentline[nameIndex];
                            var address = currentline[addressIndex];
                            var url = currentline[urlIndex];
                            resourcesWithinDistance.push({ name, address, url, lat, lon, distance });
                        }
                    }
                }
            }

            resourcesWithinDistance.sort((a, b) => a.distance - b.distance);
            updateResourcesList(resourcesWithinDistance, variableName, actualSchoolName);
        })
        .catch(error => console.error('Error loading CSV data:', error));
}

function updateResourcesList(resources, variableName, actualSchoolName) {
    var resourcesList = document.getElementById('selected-variable-resources-list');
    resourcesList.innerHTML = ''; // Clear existing list

    if (resources.length === 0) {
        resourcesList.innerHTML = `<p>No ${variableName.toLowerCase()} found within 5 miles of ${actualSchoolName}.</p>`;
        return;
    }

    var tableHTML = `<table class="resource-table"><thead><tr><th>Name</th><th>Address</th><th>Website</th><th>Distance from ${actualSchoolName}</th></tr></thead><tbody>`;
    resources.forEach(function(resource) {
        tableHTML += `<tr><td>${resource.name}</td><td>${resource.address}</td><td><a href="${resource.url}" target="_blank">Link</a></td><td>${resource.distance.toFixed(2)} miles</td></tr>`;
    });
    tableHTML += '</tbody></table>';
    resourcesList.innerHTML = tableHTML;
}

// Event listener for dropdown changes
function handleDropdownChange() {
    var schoolSelect = document.getElementById('dropdown1');
    var variableSelect = document.getElementById('dropdown2');
    var selectedSchool = schoolSelect.value;
    var selectedVariable = variableSelect.value;

    if (selectedSchool && selectedVariable) {
        displayResources(selectedSchool, selectedVariable);
    }
}
// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Function to calculate distance between two coordinates in miles
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 3958.8; // Radius of the Earth in miles
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1); 
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distance in miles
}

// Function to get resources for a school
async function getResourcesForSchool(schoolName) {
    let resourceCounts = {};

    for (const variable of geospatial) {
        const response = await fetch(variable.url);
        const csvText = await response.text();
        const lines = csvText.split("\n");
        const headers = lines[0].split(",");
        const latIndex = headers.indexOf("LATITUDE");
        const lonIndex = headers.indexOf("LONGITUDE");

        let count = 0;
        for (let i = 1; i < lines.length; i++) {
            const currentline = lines[i].split(",");
            if (currentline.length > latIndex && currentline.length > lonIndex) {
                const lat = parseFloat(currentline[latIndex]);
                const lon = parseFloat(currentline[lonIndex]);
                if (!isNaN(lat) && !isNaN(lon)) {
                    const distance = calculateDistance(schoolCoordinates[schoolName][0], schoolCoordinates[schoolName][1], lat, lon);
                    if (distance <= 5) {
                        count++;
                    }
                }
            }
        }
        resourceCounts[variable.name] = count;
    }

    return resourceCounts;
}

async function createGraphsForAllSchools() {
    for (const school of datasets) {
        const resourcesCount = await getResourcesForSchool(school.name);

        const graphContainer = document.createElement('div');
        graphContainer.className = 'school-graph-container';

        const title = document.createElement('h3');
        title.className = 'school-graph-title';
        title.textContent = school.name + ' Resources';
        graphContainer.appendChild(title);

        const canvas = document.createElement('canvas');
        canvas.id = school.name.replace(/\s+/g, '-') + '-graph';
        graphContainer.appendChild(canvas);

        document.getElementById('graphscontainer').appendChild(graphContainer);

        const resourceTypes = Object.keys(resourcesCount);
        const resourceCounts = resourceTypes.map(type => resourcesCount[type]);

        const chartData = {
            labels: resourceTypes,
            datasets: [{
                label: 'Number of Resources',
                data: resourceCounts,
                backgroundColor: resourceTypes.map(() => 'rgba(0, 123, 255, 0.5)'),
                borderColor: resourceTypes.map(() => 'rgba(0, 123, 255, 1)'),
                borderWidth: 1
            }]
        };

        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: chartData,
            options: chartOptions
        });
    }
}

// Call createGraphsForAllSchools when the page loads
document.addEventListener('DOMContentLoaded', createGraphsForAllSchools);

function populateDropdown() {
    const dropdown = document.getElementById('dropdown1');
    datasets.forEach(school => {
        let option = document.createElement('option');
        option.value = school.name;
        option.textContent = school.name;
        dropdown.appendChild(option);
    });
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', populateDropdown);

document.getElementById('dropdown1').addEventListener('change', function() {
    let selectedSchool = this.value;
    if (selectedSchool === 'All') {
        // Create graphs for all schools
        createGraphsForAllSchools();
    } else {
        // Create a graph for the selected school
        // Modify createGraphsForAllSchools or create a new function for this
        createGraphForSchool(selectedSchool);
    }
});
// Function to populate the dropdown with schools from 'datasets'
function populateSchoolDropdown() {
    const schoolSelect = document.getElementById('dropdown1');
    datasets.forEach(school => {
        let option = document.createElement('option');
        option.value = school.name;
        option.textContent = school.name;
        schoolSelect.appendChild(option);
    });
}

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

async function getResourcesForSchool(schoolName) {
    let resourceCounts = {};

    // Find the school coordinates by school name
    const schoolData = schoolCoordinates.find(school => school.name === schoolName);
    if (!schoolData) {
        console.error(`Coordinates for school '${schoolName}' not found.`);
        return {};
    }

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
                    const distance = calculateDistance(schoolData.coords[0], schoolData.coords[1], lat, lon);
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

// Global variable for the chart
let myChart;

function updateGraphOrShowMessage(labels, counts, schoolName) {
    const canvasContainer = document.getElementById('myChart').parentNode;
    const messageContainer = document.getElementById('messageContainer');

    if (schoolName === 'All' || !schoolName) {
        // Clear existing chart
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
        // Hide the canvas and show the message
        document.getElementById('myChart').style.display = 'none';
        messageContainer.innerHTML = '<p style="text-align: center; font-size: 20px;">Please select a school</p>';
        messageContainer.style.display = 'block';
    } else {
        // Ensure the canvas element is present and visible
        document.getElementById('myChart').style.display = 'block';
        messageContainer.style.display = 'none'; // Hide the message

        const ctx = document.getElementById('myChart').getContext('2d');
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Resources within 5 Miles',
                    data: counts,
                    backgroundColor: 'rgba(33, 102, 172, 0.7)', // Darker color
                    borderColor: 'rgba(33, 102, 172, 1)', // Darker color for border
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y', // Makes the bar chart horizontal
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 16 // Bigger font size for legend
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Resources by School',
                        font: {
                            size: 20 // Bigger font size for title
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 200,
                        ticks: {
                            font: {
                                size: 16 // Bigger font size for x-axis labels
                            }
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 16 // Bigger font size for y-axis labels
                            }
                        }
                    }
                }
            }
        });
    }
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', async function() {
    populateSchoolDropdown(); // Populate the dropdown

    // Display message initially or load first school's data
    if (datasets && datasets.length > 0) {
        const selectedSchool = datasets[0].name;
        if (selectedSchool === 'All' || !selectedSchool) {
            updateGraphOrShowMessage(null, null, 'All');
        } else {
            const resourceCounts = await getResourcesForSchool(selectedSchool);
            updateGraphOrShowMessage(Object.keys(resourceCounts), Object.values(resourceCounts), selectedSchool);
        }
    }

    // Add event listener for dropdown changes
    document.getElementById('dropdown1').addEventListener('change', async function() {
        const selectedSchool = this.value;
        if (selectedSchool === 'All' || !selectedSchool) {
            updateGraphOrShowMessage(null, null, 'All');
        } else {
            const resourceCounts = await getResourcesForSchool(selectedSchool);
            updateGraphOrShowMessage(Object.keys(resourceCounts), Object.values(resourceCounts), selectedSchool);
        }
    });
});

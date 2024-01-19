// Define global chart variable
var myChart;

// Function to create a new chart
function createChart(chartData) {
    // Destroy existing chart instance if it exists
    console.log("createChart called with data: ", chartData);
    if (myChart && typeof myChart.destroy === 'function') {
        myChart.destroy();
    }

    // Create a new chart instance
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Function to load graph data
function loadGraph(url, column) {
    console.log("loadGraph called with URL: ", url, " and column: ", column);
    Papa.parse(url, {
        download: true,
        header: true,
        complete: function(results) {
            console.log("CSV data: ", results.data);
            var chartData = processDataForChart(results.data, column);
            createChart(chartData);
        }
    });
}

// Function to process CSV data for the chart
function processDataForChart(data, column) {
    var labels = data.map(item => item.SchoolName);
    var dataset = data.map(item => parseFloat(item[column]));

    return {
        labels: labels,
        datasets: [{
            label: column,
            data: dataset,
            backgroundColor: '#76B9F0',
            borderColor: '#000000',
            borderWidth: 1
        }]
    };
}

// Function to update dropdown based on the selected school type
function updateDropdown(schoolType) {
    var dropdown = document.getElementById('dropdown1');
    dropdown.innerHTML = ''; // Clear existing options

    var data = statdata[schoolType + 'Schools'];
    data.forEach(function(item) {
        var option = document.createElement('option');
        option.value = item.url;
        option.textContent = item.name;
        if (item.column) {
            option.setAttribute('data-column', item.column);
        }
        dropdown.appendChild(option);
    });

    // Load initial graph
    if (data[0].column) {
        loadGraph(data[0].url, data[0].column);
    } else {
        // Handle the case where the first item doesn't have a column
    }
}

// Function to handle tab switching
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Update the dropdown based on the tab name
    var schoolType = tabName.replace('Schools', '');
    updateDropdown(schoolType);
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Apply the saved value on page load
    applySavedDropdownValue();

    // Initially populate the dropdown for Elementary Schools
    updateDropdown('Elementary');

    var dropdown = document.getElementById('dropdown1');
    dropdown.addEventListener('change', function() {
        var selectedUrl = dropdown.value;
        var selectedColumn = dropdown.options[dropdown.selectedIndex].getAttribute('data-column');
        loadGraph(selectedUrl, selectedColumn);
    });
});

// Functions for saving and applying dropdown value
function saveDropdownValue() {
    var statisticDropdown = document.getElementById('dropdown1');
    localStorage.setItem('selectedStatistic', statisticDropdown.value);
}

function applySavedDropdownValue() {
    var savedStatistic = localStorage.getItem('selectedStatistic');
    if (savedStatistic) {
        document.getElementById('dropdown1').value = savedStatistic;
    }
}

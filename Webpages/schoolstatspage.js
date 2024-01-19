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

    // Call updateDropdown with the tabName
    updateDropdown(tabName);
}



function updateDropdown(schoolType) {
    var dropdown = document.getElementById('dropdown1');
    dropdown.innerHTML = ''; // Clear existing options

    // Map schoolType to the corresponding key in statdata
    var schoolTypeKey = schoolType === 'ElementarySchools' ? 'ElementarySchools' :
                        schoolType === 'MiddleSchools' ? 'MiddleSchools' :
                        'HighSchools';

    var data = statdata[schoolTypeKey];
    data.forEach(function(item) {
        var option = document.createElement('option');
        option.value = item.url;
        option.textContent = item.name;
        dropdown.appendChild(option);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown and chart
    var dropdown = document.getElementById('dropdown1');
    updateDropdown('ElementarySchools'); // Default to ElementarySchools
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart;

    // Dropdown change event
    dropdown.addEventListener('change', function() {
        var selectedUrl = dropdown.value;
        var selectedColumn = dropdown.options[dropdown.selectedIndex].getAttribute('data-column');
        parseCSVAndCreateGraph(selectedUrl, selectedColumn);
    });

    // Update dropdown based on tab selection
    document.querySelectorAll('.tablinks').forEach(function(tab) {
        tab.addEventListener('click', function(evt) {
            updateDropdown(evt.currentTarget.textContent.replace(/\s+/g, ''));
        });
    });

    function updateDropdown(schoolType) {
        dropdown.innerHTML = '';
        var data = statdata[schoolType];
        data.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item.url;
            option.textContent = item.name;
            if (item.column) {
                option.setAttribute('data-column', item.column);
            }
            dropdown.appendChild(option);
        });

        // Trigger graph update for the first item
        var firstItem = data[0];
        parseCSVAndCreateGraph(firstItem.url, firstItem.column || 'School_Name');
    }

    function parseCSVAndCreateGraph(url, column) {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function(results) {
                createBarGraph(results.data, column);
            }
        });
    }

    function createBarGraph(data, column) {
        // Prepare data for the graph
        var labels = data.map(function(row) { return row['School_Name']; });
        var values = data.map(function(row) { return row[column]; });

        // Destroy previous chart instance if exists
        if (myChart) {
            myChart.destroy();
        }

        // Create new chart instance
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: column,
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});



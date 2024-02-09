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
}

function initializeDropdown() {
  const dropdown = document.getElementById('dropdown1');
  const statistics = [
    "Average Class Size",
    "Bachelor Degree Rate",
    "BIPOC Students per School",
    "Enrollment",
    "Experienced Teacher Ratio",
    "Free and Reduced Lunch",
    "Funding Per Pupil",
    "English as a Second Language (ESL) Student Enrollment",
    "In-School Suspensions (ISS)",
    "Median Age",
    "Median Homesale Price",
    "Median Household Income",
    "Racial Demographics",
    "School and Zone BIPOC Comparison",
    "Sidewalk Coverage",
    "Students Per Device",
    "Student-Teacher Ratio, Elementary School",
    "Students With Disabilities",
    "Titles Per Student",
    "WiFi Access Points Per Classroom"
  ];

  statistics.forEach(stat => {
    const option = document.createElement('option');
    option.value = stat;
    option.textContent = stat;
    dropdown.appendChild(option);
  });
}

function fetchDataAndDrawChart(selectedStatistic, selectedSchoolType) {
  let csvUrl = '';
  // URL selection based on school type
  switch (selectedSchoolType) {
    case "Elementary":
      csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/3a0d041f469685e64ec817c7736cc85ede48f0e2/CSV%20Data%20School%20Stats/ES_stats_23.csv';
      break;
    case "Middle":
      csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/main/CSV%20Data%20School%20Stats/MS_stats_23.csv';
      break;
    case "High":
      csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/main/CSV%20Data%20School%20Stats/HS_stats_23.csv';
      break;
  }

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      const column = statisticToColumnMapping[selectedStatistic];
      if (!column) {
        console.error("Data column for selected statistic not found:", selectedStatistic);
        return;
      }
      const chartData = processDataForChart(results.data, column, selectedStatistic);
      createChart(chartData);
    }
  });
}

function processDataForChart(data, column, statisticName) {
  // Ensure the SCHOOL_NAME column matches your CSV
  var labels = data.map(item => item.SCHOOL_NAME); 
  var dataset = data.map(item => item[column] ? parseFloat(item[column]) : 0);

  return {
    labels: labels,
    datasets: [{
      label: statisticName,
      data: dataset,
      backgroundColor: '#76B9F0',
      borderColor: '#000000',
      borderWidth: 1
    }]
  };
}

function createChart(chartData) {
  var ctx = document.getElementById('myChart').getContext('2d');
  if (window.myChartInstance) {
    window.myChartInstance.destroy();
  }
  window.myChartInstance = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: { beginAtZero: true },
        x: { display: true }
      },
      plugins: { legend: { display: true } },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeDropdown();
  const statisticDropdown = document.getElementById('dropdown1');
  const schoolTypeDropdown = document.getElementById('schoolTypeDropdown');

  statisticDropdown.addEventListener('change', function() {
    const selectedStatistic = this.value;
    const selectedSchoolType = schoolTypeDropdown.value;
    fetchDataAndDrawChart(selectedStatistic, selectedSchoolType);
  });

  schoolTypeDropdown.addEventListener('change', function() {
    const selectedStatistic = statisticDropdown.value;
    const selectedSchoolType = this.value;
    fetchDataAndDrawChart(selectedStatistic, selectedSchoolType);
  });
});
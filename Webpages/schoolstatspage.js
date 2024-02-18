document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown(); // Initialize dropdown with statistics options
    setupSchoolTypeDropdown(); // Setup listener for school type changes
  
    // Initialize chart with default selections (if needed)
    const initialSchoolType = document.getElementById('schoolTypeDropdown').value;
    const initialStatistic = document.getElementById('dropdown1').value;
    fetchDataAndDrawChart(initialStatistic, initialSchoolType);
  });
  
  function setupSchoolTypeDropdown() {
    const schoolTypeDropdown = document.getElementById('schoolTypeDropdown');
    schoolTypeDropdown.addEventListener('change', function() {
      const selectedSchoolType = this.value;
      const statisticDropdown = document.getElementById('dropdown1');
      const selectedStatistic = statisticDropdown.options[statisticDropdown.selectedIndex].value;
      fetchDataAndDrawChart(selectedStatistic, selectedSchoolType);
    });
  }
  
  function initializeDropdown() {
    const dropdown = document.getElementById('dropdown1');
    const statistics = Object.keys(statisticToColumnMapping);
  
    statistics.forEach(stat => {
      const option = document.createElement('option');
      option.value = stat;
      option.textContent = stat;
      dropdown.appendChild(option);
    });
  
    dropdown.addEventListener('change', function() {
      const selectedSchoolType = document.getElementById('schoolTypeDropdown').value;
      const selectedStatistic = this.value;
      fetchDataAndDrawChart(selectedStatistic, selectedSchoolType);
    });
  }
  
  function fetchDataAndDrawChart(selectedStatistic, selectedSchoolType) {
    console.log("Fetching data for:", selectedStatistic, "in", selectedSchoolType);
    
    let csvUrl = '';
    switch (selectedSchoolType) {
      case "Elementary":
        csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/3a0d041f469685e64ec817c7736cc85ede48f0e2/CSV%20Data%20School%20Stats/ES_stats_23.csv'; 
        break;
      case "Middle":
        csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/9bf837e93801b24d8698c7bb436baea64582b955/CSV%20Data%20School%20Stats/MS_stats_23.csv'; 
        break;
      case "High":
        csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/9bf837e93801b24d8698c7bb436baea64582b955/CSV%20Data%20School%20Stats/HS_stats_23.csv';
        break;
      default:
        console.error("Unexpected school type:", selectedSchoolType);
        return;
    }
  
    const column = statisticToColumnMapping[selectedStatistic];
    if (!column) {
      console.error("Column not found for statistic:", selectedStatistic);
      return;
    }
  
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        const chartData = processDataForChart(results.data, column, selectedStatistic);
        createChart(chartData);
      }
    });
  }
  
  function processDataForChart(data, column, statisticName) {
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
  
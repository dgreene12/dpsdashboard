function loadCSVData(filePath, callback) {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: function(results) {
        callback(results.data);
      }
    });
  }
  
  function processDataForChart(rawData) {
    // Assuming rawData is an array of objects, each representing a row in the CSV
    const labels = rawData.map(row => row.label); // Replace 'label' with the actual column name in your CSV
    const data = rawData.map(row => row.value); // Replace 'value' with the actual column name in your CSV
  
    return { 
      labels, 
      datasets: [{
        data,
        // Include other settings like backgroundColor, borderColor, etc.
      }]
    };
  }
  
  function initGraphs() {
    loadCSVData('path/to/your/csvfile.csv', function(csvData) {
      const chartData = processDataForChart(csvData);
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
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
          maintainAspectRatio: false,
          indexAxis: 'y', // For horizontal bar chart
          // ... other options ...
        }
      });
    });
  }
  
  function processDataForChart(rawData) {
    const places = [...new Set(rawData.map(item => item.place))]; // Unique places
    const sorzCategories = [...new Set(rawData.map(item => item.sorz))]; // Unique 'sorz' values
  
    const datasets = sorzCategories.map(sorz => {
      return {
        label: sorz,
        data: places.map(place => {
          const item = rawData.find(item => item.place === place && item.sorz === sorz);
          return item ? item.number : 0;
        }),
        backgroundColor: sorz === 'Category1' ? '#D1E3F4' : '#76B9F0', // Adjust these colors as needed
        // other settings...
      };
    });
  
    return {
      labels: places,
      datasets
    };
  }

  function renderAverageClassSizeGraph(csvData) {
    const labels = csvData.map(item => item.SCHOOL_NAME); // Assuming 'SCHOOL_NAME' is a column in your CSV
    const data = csvData.map(item => parseFloat(item.AVG_CLASS_SIZE)); // Convert string to number
  
    // Create a bar chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const averageClassSizeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Class Size',
          data: data,
          backgroundColor: '#76B9F0',
          borderColor: 'white',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y', // For horizontal bar chart
        scales: {
          x: {
            beginAtZero: true
          }
        },
        // ... other options ...
      }
    });
  }

  function renderBachelorDegreeRateGraph(csvData) {
    const labels = csvData.map(item => item.SCHOOL_NAME); // Assuming 'SCHOOL_NAME' is a column in your CSV
    const data = csvData.map(item => parseFloat(item.BACHELOR_DEG_RATE)); // Convert string to number

  }

  function handleGraphSelection(selectedGraph, selectedYear) {
    const csvFilePath = `path/to/${selectedYear}_data.csv`;
    loadCSVData(csvFilePath, function(csvData) {
      switch (selectedGraph) {
        case "Average Class Size":
          renderAverageClassSizeGraph(csvData);
          break;
        case "Bachelor Degree Rate":
          renderBachelorDegreeRateGraph(csvData);
          break;
        // ... cases for other graph types
      }
    });
  }

  document.getElementById('graph-selection-dropdown').addEventListener('change', function() {
    const selectedGraph = this.value;
    const selectedYear = this.value; //fix this
    handleGraphSelection(selectedGraph, selectedYear);
  });


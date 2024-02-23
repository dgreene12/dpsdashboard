const statisticToColumnMapping = {
  //"AP Course Enrollment [HS Only]": "ADV_COURSES_PERCENT",
  "Average Class Size": "AVG_CLASS_SIZE",
  "Bachelor\'s Degree Rate": "BACHELOR_DEG_RATE",
  //"BIPOC Students per School": "BIPOC_PERCENT",
  "CTE Course Enrollment [MS/HS Only]": "CTE_RATE",
  //"English as a Second Language (ESL) Student Enrollment": "ESL_PERCENT",
  "Enrollment": "ENROLLMENT_NA",
  "Experienced Teacher Ratio": "EXP_TEACHER_RATIO",
  "Free and Reduced Lunch": "FREE_RED_PERCENT",
  "Funding Per Pupil": "FUNDING_PER_PUPIL",
  "Graduation Rate [HS Only]": "GRADUATION_RATE",
  "In-School Suspensions (ISS)": "IN_SCHOOL_SUSP_PER_1000",
  "Median Age of School Community": "MED_AGE",
  "Median Homesale Price": "MED_HOMESALE_PRICE",
  "Median Household Income": "MED_HOUSEHOLD_INC",
  "Racial Demographics": "RACIAL_DEMOGRAPHICS",
  //"School and Zone BIPOC Comparison": "SCHOOL_ZONE_BIPOC_COMP",
  "Sidewalk Coverage": "SIDEWALK_COVG",
  "Students Per Device": "STUDENTS_PER_DEVICE",
  //"Student-Teacher Ratio": "STUDENT_TEACHER_ELEM",
  //"Students With Disabilities": "DISABLED_PERCENT",
  "Books Per Student": "TITLES_PER_STUDENT",
  "WiFi Access Points Per Classroom": "WIFI_ACCESS_PTS",
  
}

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
  //const defaultOption = document.createElement('option');
  //defaultOption.value = ""; // Empty value indicates no selection
  //defaultOption.textContent = "Select a Statistic"; // Text prompting user to make a selection
  //defaultOption.disabled = true; // Optionally make it disabled
  //defaultOption.selected = true; // Make it the selected option by default
  //dropdown.appendChild(defaultOption); // Add it to the dropdown
  const statistics = [
    //"AP Course Enrollment [HS Only]",
    "Average Class Size",
    "Bachelor\'s Degree Rate",
    //"BIPOC Students per School",
    "CTE Course Enrollment [MS/HS Only]",
    //"English as a Second Language (ESL) Student Enrollment",
    "Enrollment",
    "Experienced Teacher Ratio",
    "Free and Reduced Lunch",
    "Funding Per Pupil",
    "Graduation Rate [HS Only]",
    "In-School Suspensions (ISS)",
    "Median Age of School Community",
    "Median Homesale Price",
    "Median Household Income",
    "Racial Demographics",
    //"School and Zone BIPOC Comparison",
    "Sidewalk Coverage",
    "Students Per Device",
    "Student-Teacher Ratio",
    //"Students With Disabilities",
    "Books Per Student",
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
  console.log("Selected Statistic:", selectedStatistic); // Debugging line
  console.log("Selected School Type:", selectedSchoolType); // Debugging line
  if (selectedStatistic === "Racial Demographics") {
    // Use specific URLs for "Racial Demographics"
    switch (selectedSchoolType) {
      case "Elementary":
        csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/b6ddf40cf546acb04927f3e2d9a55ff057f8c3c3/CSV%20Data%20School%20Stats/ES_all%20race%202023.csv'; 
        break;
      case "Middle":
        csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/b6ddf40cf546acb04927f3e2d9a55ff057f8c3c3/CSV%20Data%20School%20Stats/MS_all%20race%202023.csv'; 
        break;
      case "High":
        csvUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/b6ddf40cf546acb04927f3e2d9a55ff057f8c3c3/CSV%20Data%20School%20Stats/HS_all%20race%202023.csv';
        break;
      default:
        console.error("Unexpected school type for Racial Demographics:", selectedSchoolType);
        return; // Exit if no matching case
    }
  } else {
    // Use original URLs for other statistics
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
        return; // Exit if no matching case
    }
  }

  // Adjust the column mapping for the Student-Teacher Ratio based on the school type
  let columnMapping = { ...statisticToColumnMapping }; // Clone the original mapping
  if (selectedStatistic === "Student-Teacher Ratio") {
    switch (selectedSchoolType) {
      case "Elementary":
        columnMapping["Student-Teacher Ratio"] = "STUDENT_TEACHER_ELEM";
        break;
      case "Middle":
        columnMapping["Student-Teacher Ratio"] = "STUDENT_TEACHER_MS";
        break;
      case "High":
        columnMapping["Student-Teacher Ratio"] = "STUDENT_TEACHER_HS";
        break;
    }
  }

  function processRacialDemographicsData(data) {
    const schools = {};
    // Aggregate data by school
    data.forEach(row => {
      if (!schools[row.school]) {
        schools[row.school] = {};
      }
      schools[row.school][row.race] = parseFloat(row.number);
    });
  
    const chartData = {
      labels: Object.keys(schools),
      datasets: []
    };
  
    const races = ["Asian", "Black/African American", "Hispanic/Latino", "Indigenous", "White"];
    races.forEach(race => {
      const dataset = {
        label: race,
        data: [],
        backgroundColor: getRaceColor(race), // Function to assign color based on race
        stack: 'Stack 0'
      };
      Object.values(schools).forEach(school => {
        dataset.data.push(school[race] || 0); // Add 0 if race is not present for a school
      });
      chartData.datasets.push(dataset);
    });
  
    return chartData;
  }
  
  function getRaceColor(race) {
    const colors = {
      "Asian": "#FF4500", // Orange Red
      "Black/African American": "#FFD700", // Gold (Yellow)
      "Hispanic/Latino": "#32CD32", // Lime Green
      "Indigenous": "#1E90FF", // Dodger Blue
      "White": "#9400D3" // Dark Violet
    };
    return colors[race] || "#808080"; // Default color if race not found
  }

  Papa.parse(csvUrl, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function(results) {
      if (selectedStatistic === "Racial Demographics") {
        // Special processing for Racial Demographics
        const chartData = processRacialDemographicsData(results.data);
        createStackedBarChart(chartData);
      } else {
        // Existing logic for other statistics
        const column = columnMapping[selectedStatistic];
        if (!column) {
          console.error("Data column for selected statistic not found:", selectedStatistic);
          return;
        }
        const chartData = processDataForChart(results.data, column, selectedStatistic);
        createChart(chartData);
      }
    }
  });
}

function processDataForChart(data, column, statisticName) {
  var labels = data.map(item => item.SCHOOL_NAME); 
  var dataset = data.map(item => {
    const value = item[column] ? parseFloat(item[column]) : 0;
    // Check if the current item is "Durham County" and assign a unique color
    const backgroundColor = item.SCHOOL_NAME === "Durham County" ? '#FF5733' : '#76B9F0';
    return {
      data: value,
      backgroundColor: backgroundColor,
      borderColor: '#000000',
      borderWidth: 1
    };
  });

  return {
    labels: labels,
    datasets: [{
      label: statisticName,
      data: dataset.map(item => item.data), // Extract just the data values for the chart
      backgroundColor: dataset.map(item => item.backgroundColor), // Apply unique background colors
      borderColor: dataset.map(item => item.borderColor),
      borderWidth: dataset.map(item => item.borderWidth)
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

function createStackedBarChart(chartData) {
  var ctx = document.getElementById('myChart').getContext('2d');
  if (window.myChartInstance) {
    window.myChartInstance.destroy();
  }
  window.myChartInstance = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      },
      plugins: { legend: { display: true } },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize any required setups
  initializeDropdown(); // Assuming this populates your statistic dropdown

  const schoolTypeDropdown = document.getElementById('schoolTypeDropdown');
  const statisticDropdown = document.getElementById('dropdown1');

  // Assuming fetchDataAndDrawChart is your function to fetch data and update the chart
  schoolTypeDropdown.addEventListener('change', function() {
    const selectedSchoolType = this.value;
    const selectedStatistic = statisticDropdown.value;
    fetchDataAndDrawChart(selectedStatistic, selectedSchoolType);
  });

  // Your existing setup for statisticDropdown change event
  statisticDropdown.addEventListener('change', function() {
      const selectedStatistic = this.value;
      const selectedSchoolType = schoolTypeDropdown.value;
      fetchDataAndDrawChart(selectedStatistic, selectedSchoolType);
  });

  // Initial fetch and draw chart based on default or initial selections
  const initialStatistic = statisticDropdown.value;
  const initialSchoolType = schoolTypeDropdown.value;
  fetchDataAndDrawChart(initialStatistic, initialSchoolType);
});
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
    default:
      console.error("Unsupported school type:", selectedSchoolType);
      return;
  }

  fetch(csvUrl)
    .then(response => response.text())
    .then(csvString => {
      const data = Papa.parse(csvString, {header: true, dynamicTyping: true}).data;
      drawChart(data, selectedStatistic);
    })
    .catch(error => console.error("Failed to fetch data:", error));
}

function drawChart(data, selectedStatistic) {
  // Extended mapping of friendly names to actual column names in the CSV data
  const statisticToColumnMapping = {
    "Average Class Size": "AVG_CLASS_SIZE",
    "Bachelor Degree Rate": "BACHELOR_DEG_RATE",
    "BIPOC Students per School": "BIPOC_PERCENT",
    "Enrollment": "ENROLLMENT_NA",
    "Experienced Teacher Ratio": "EXP_TEACHER_RATIO",
    "Free and Reduced Lunch": "FREE_RED_PERCENT",
    "Funding Per Pupil": "FUNDING_PER_PUPIL",
    "English as a Second Language (ESL) Student Enrollment": "ESL_PERCENT",
    "In-School Suspensions (ISS)": "IN_SCHOOL_SUSP_PER_1000",
    "Median Age": "MED_AGE",
    "Median Homesale Price": "MED_HOMESALE_PRICE",
    "Median Household Income": "MED_HOUSEHOLD_INC",
    "Racial Demographics": "RACIAL_DEMOGRAPHICS", // Placeholder, adjust based on actual data
    "School and Zone BIPOC Comparison": "SCHOOL_ZONE_BIPOC_COMP", // Placeholder
    "Sidewalk Coverage": "SIDEWALK_COVG",
    "Students Per Device": "STUDENTS_PER_DEVICE",
    "Student-Teacher Ratio, Elementary School": "STUDENT_TEACHER_ELEM",
    "Students With Disabilities": "DISABLED_PERCENT",
    "Titles Per Student": "TITLES_PER_STUDENT",
    "WiFi Access Points Per Classroom": "WIFI_ACCESS_PTS",
  };

  // Use the selectedStatistic to find the correct data column name
  const dataColumn = statisticToColumnMapping[selectedStatistic];
  if (!dataColumn) {
    console.error("Data column for selected statistic not found:", selectedStatistic);
    return; // Exit the function if the data column is not found
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  const chartData = data.reduce((acc, cur) => {
    if (cur.SCHOOL_NAME && cur[dataColumn] !== undefined) {
      acc.labels.push(cur.SCHOOL_NAME);
      acc.data.push(cur[dataColumn]);
    }
    return acc;
  }, { labels: [], data: [] });

  // Clear previous chart if exists
  if (window.myChartInstance) {
    window.myChartInstance.destroy();
  }

  // Create new chart instance
  window.myChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: selectedStatistic,
        data: chartData.data,
        backgroundColor: '#76B9F0',
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: true
        }
      }
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
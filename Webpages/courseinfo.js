document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown1');
    const apiUrl = 'https://raw.githubusercontent.com/dgreene12/dpsdashboard/main/CSV%20Data%20School%20Stats/APcourses.csv';

    fetch(apiUrl)
      .then(response => response.text())
      .then(data => {
        const coursesData = parseCSVData(data);
        populateDropdown(coursesData);

        dropdown.addEventListener('change', function() {
          displayCoursesForSchool(this.value, coursesData);
        });
      });
});

// Parse CSV Data
function parseCSVData(csvData) {
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    const result = [];
    const headers = lines[0].split(',').map(header => header.trim());

    for(let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',').map(item => item.trim());

        for(let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result.filter(item => item.School && item.School.trim() !== ''); // Filter out entries without a valid school name
}

// Populate Dropdown
function populateDropdown(coursesData) {
    let schools = [...new Set(coursesData.map(course => course.School.trim()))];
    schools.sort();
    const dropdown = document.getElementById('dropdown1');
    dropdown.innerHTML = ''; // Clear existing options
    
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Choose a school';
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);

    schools.forEach(school => {
        let option = document.createElement('option');
        option.value = school;
        option.text = school;
        dropdown.appendChild(option);
    });
}

// Display Courses for Selected School
function displayCoursesForSchool(school, coursesData) {
    const courseTypes = {
        "English": "English",
        "Math": "Math",
        "Science": "Science",
        "SocialScience": "Social Sciences",
        "WorldLanguages": "World Languages",
        "MusicAndArts": "Music and Arts",
        "Engineering": "Engineering"
    };

    for (let type in courseTypes) {
        let container = document.getElementById(type);
        let list = container.querySelector('.course-list');
        list.innerHTML = ''; // Clear previous content

        let subjectName = courseTypes[type];
        let filteredCourses = coursesData.filter(course => course.School === school && course.Subject === subjectName);

        filteredCourses.forEach(course => {
            let listItem = document.createElement('li');
            listItem.textContent = course.Course;
            list.appendChild(listItem);
        });
    }

    function updateTable(coursesData) {
        // Dynamically determine course types from coursesData
        const courseTypes = Array.from(new Set(coursesData.map(course => course.Subject)));
    
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ''; // Clear existing rows
    
        const schoolCounts = {};
        coursesData.forEach(course => {
            if (!schoolCounts[course.School]) {
                schoolCounts[course.School] = courseTypes.reduce((acc, type) => ({ ...acc, [type]: 0 }), {});
            }
            schoolCounts[course.School][course.Subject]++;
        });
    
        for (const [school, counts] of Object.entries(schoolCounts)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${school}</td>` + courseTypes.map(type => `<td>${counts[type] || 0}</td>`).join('');
            tableBody.appendChild(row);
        }
    }

    function updateTableHeaders(courseTypes) {
        const thead = document.querySelector('table tr');
        thead.innerHTML = '<th>School</th>' + courseTypes.map(type => `<th>${type}</th>`).join('');
    }
    
    // You would call this function after determining courseTypes in updateTable
    updateTableHeaders(courseTypes);
}
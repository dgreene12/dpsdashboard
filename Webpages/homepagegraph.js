document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map-placeholder').setView([35.994034, -78.898621], 12); // Adjust the center and zoom level to fit your data

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var schoolIcon = L.icon({
        iconUrl: 'https://i.imgur.com/Y9O61u7.png', // URL to school icon
        iconSize: [16, 21], // size of the icon
        iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -28] // point from which the popup should open relative to the iconAnchor
    });

    var universityIcon = L.icon({
        iconUrl: 'https://i.imgur.com/yQYOOTG.png', // URL to university icon
        iconSize: [32, 37], // size of the icon
        iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -28] // point from which the popup should open relative to the iconAnchor
    });

    var homecoordinates = [
        { name: "Bethesda Elementary", coords: [35.94237, -78.83834] },
        { name: "Brogden Middle", coords: [36.02501, -78.90877] },
        { name: "Burton Elementary", coords: [35.9792, -78.8877] },
        { name: "C.C. Spaulding Elementary", coords: [35.9782, -78.90615] },
        { name: "Carrington Middle", coords: [36.08757, -78.91818] },
        { name: "City of Medicine Academy [Magnet]", coords: [36.03812, -78.90232] },
        { name: "Club Boulevard Elementary", coords: [36.01894, -78.89716] },
        { name: "Creekside Elementary", coords: [35.9287, -78.9935] },
        { name: "Durham Performance Learning Center [Magnet]", coords: [35.9898, -78.8788] },
        { name: "Durham School of the Arts [Magnet]", coords: [36.00297, -78.9059] },
        { name: "Durham School of Technology [Magnet]", coords: [35.95339276, -78.90357409] },
        { name: "E.K. Powe Elementary", coords: [36.0129, -78.92254] },
        { name: "Easley Elementary", coords: [36.0759, -78.9263] },
        { name: "Eastway Elementary", coords: [35.9909, -78.88519] },
        { name: "Eno Valley Elementary", coords: [36.08541, -78.9119] },
        { name: "Fayetteville Street Elementary", coords: [35.96464, -78.90593] },
        { name: "Forest View Elementary", coords: [35.98924, -78.99232] },
        { name: "George Watts Elementary", coords: [36.00817, -78.91012] },
        { name: "Glenn Elementary", coords: [36.0287, -78.8371] },
        { name: "Hillandale Elementary", coords: [36.05236, -78.93292] },
        { name: "Hillside High", coords: [35.95339276, -78.90357409] },
        { name: "Holt Elementary", coords: [36.05675840608633, -78.90643466154617] },
        { name: "Holton Career & Resource Center [Magnet]", coords: [35.98982, -78.87893] },
        { name: "Hope Valley Elementary", coords: [35.9674, -78.9381] },
        { name: "J.D. Clement Early College [Magnet]", coords: [35.97467, -78.90097] },
        { name: "Jordan High", coords: [35.92390841, -78.9613309] },
        { name: "Lakeview High", coords: [36.03763, -78.87844] },
        { name: "Lakewood Elementary", coords: [35.98288, -78.93535] },
        { name: "Lakewood Montessori Middle [Magnet]", coords: [35.98493, -78.92847] },
        { name: "Lowe's Grove Middle", coords: [35.90461, -78.89126] },
        { name: "Lucas Middle", coords: [36.10914, -78.88588] },
        { name: "Lyons Farm Elementary", coords: [335.87343864079329, -78.92396902108148] },
        { name: "Mangum Elementary", coords: [36.17061332683497, -78.87620075397203] },
        { name: "Merrick-Moore Elementary", coords: [36.0055, -78.8521] },
        { name: "Middle College [Magnet]", coords: [35.97539, -78.88072] },
        { name: "Morehead Montessori Elementary [Magnet]", coords: [35.9887, -78.9137] },
        { name: "Neal Middle", coords: [35.97812, -78.7812] },
        { name: "Northern High", coords: [36.09381, -78.91181] },
        { name: "Oak Grove Elementary", coords: [35.9799, -78.8195] },
        { name: "Parkwood Elementary", coords: [35.89169, -78.90663] },
        { name: "Pearsontown Elementary", coords: [35.9323, -78.9086] },
        { name: "R.N. Harris Elementary", coords: [35.97146, -78.88387] },
        { name: "Riverside High", coords: [36.06566786, -78.94334034] },
        { name: "Rogers-Herr Middle", coords: [35.97283, -78.93391] },
        { name: "Sandy Ridge Elementary", coords: [36.0583045926422, -78.8699442856636] },
        { name: "School for Creative Studies [Magnet]", coords: [36.07204, -78.82223] },
        { name: "Sherwood Githens Middle", coords: [35.94427, -78.97978] },
        { name: "Shepard Middle [Magnet]", coords: [35.96548, -78.89958] },
        { name: "Southern School of Energy and Sustainability", coords: [35.99991, -78.8292] },
        { name: "Southwest Elementary", coords: [35.928775101176036, -78.92356096441785] },
        { name: "Spring Valley Elementary", coords: [35.95612, -78.81522] },
        { name: "W.G. Pearson Elementary", coords: [35.95826, -78.90769] },
        { name: "Y.E. Smith Elementary", coords: [35.98547, -78.87286] },
        { name: "Duke University", coords: [36.00207573346363, -78.94033908587518] },
        { name: "North Carolina Central University", coords: [35.9753028674011, -78.8996191581248] }
    ];

    homecoordinates.forEach(function(school) {
        var icon = school.name.includes("University") ? universityIcon : schoolIcon; // Choose the icon based on the name

        var marker = L.marker(school.coords, {icon: icon}).addTo(map);
        marker.bindPopup("<b>" + school.name + "</b>");
    });
});



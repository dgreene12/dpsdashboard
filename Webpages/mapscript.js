    var map;
    var currentGeoJsonLayer;
    var schoolMarker;
    var currentMarkers = [];

    document.addEventListener('DOMContentLoaded', function() {
        initializeMap();
        populateDropdowns();
        setupMapControls();
        setupEventListeners();
        loadInitialLanguage();
    });

    function initializeMap() {
    map = L.map('map-placeholder');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Load initial GeoJSON data for the default view (assuming datasets[0] is your default dataset)
    addGeoJsonToMap(datasets[0].url, datasets[0].name);
}

    function populateDropdowns() {
    var dropdown1 = document.getElementById('dropdown1');
    var dropdown2 = document.getElementById('dropdown2');

    // Populating dropdown1 with 'datasets' array
    datasets.forEach(function(dataset) {
        var option = document.createElement('option');
        option.value = dataset.name;
        option.textContent = dataset.name.charAt(0).toUpperCase() + dataset.name.slice(1);
        dropdown1.appendChild(option);
    });

    // Populating dropdown2 with 'geospatial' array
    geospatial.forEach(function(item) {
        var option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        dropdown2.appendChild(option);
    });
}

    function setupMapControls() {
        var resetMapControl = L.control({position: 'topright'});
        resetMapControl.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'reset-map-control');
            var resetButton = document.createElement('button');
            resetButton.innerText = 'Reset Map';
            resetButton.setAttribute('style', "background-color: #663399; color: white; border: none; border-radius: 5px; padding: 10px 15px; font-family: 'Lato', sans-serif; font-size: 16px; cursor: pointer; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); transition: background-color 0.3s, box-shadow 0.3s;");
            resetButton.onclick = function() {
                resetMap();
            };
            div.appendChild(resetButton);
            return div;
        };
        resetMapControl.addTo(map);
    }

    function resetMap() {
        if (currentGeoJsonLayer) {
            map.removeLayer(currentGeoJsonLayer);
        }
        if (schoolMarker) {
            map.removeLayer(schoolMarker);
        }
        document.getElementById('dropdown1').value = 'All';
        document.getElementById('dropdown2').value = '';
        addGeoJsonToMap(datasets[0].url, datasets[0].name);
        clearMarkers();
    }
    function setupEventListeners() {
        document.getElementById('dropdown1').addEventListener('change', handleSchoolZoneChange);
        document.getElementById('dropdown2').addEventListener('change', handleVariableChange);
        document.getElementById('language-dropdown').addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }

    function handleSchoolZoneChange() {
    var selectedZone = this.value;
    var selectedDataset = datasets.find(dataset => dataset.name === selectedZone);

    if (selectedDataset) {
        // This will not affect the GeoJSON layer added by dropdown 2
        addGeoJsonToMap(selectedDataset.url, selectedDataset.name);
        updateSchoolMarker(selectedZone);
    } else {
        console.error('No matching dataset found for:', selectedZone);
    }
}

    var smallIcon = L.icon({
        iconUrl: 'https://i.imgur.com/Y9O61u7.png',
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [12, 25], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -25] // Point from which the popup should open relative to the iconAnchor
    });

    function updateSchoolMarker(zoneName) {
        const schoolData = schoolCoordinates.find(school => school.name === zoneName);
        if (schoolData && schoolData.coords) {
            if (!schoolMarker || !map.hasLayer(schoolMarker)) {
                // Use the custom icon when creating a new marker
                schoolMarker = L.marker(schoolData.coords, { icon: smallIcon }).addTo(map);
            } else {
                // Update the marker's position and icon
                schoolMarker.setLatLng(schoolData.coords);
                schoolMarker.setIcon(smallIcon);
            }
        }
    }

    function handleVariableChange() {
        var selectedVariableName = this.value;
        var selectedVariable = geospatial.find(item => item.name === selectedVariableName);
    
        if (selectedVariable) {
            loadCsvDataOnMap(selectedVariable.url, selectedVariable.iconUrl);
        } else {
            console.error('No matching geospatial dataset found for:', selectedVariableName);
        }
    }

function csvToGeoJson(csvText) {
    var lines = csvText.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    var latIndex = headers.indexOf("LATITUDE");
    var lngIndex = headers.indexOf("LONGITUDE");
    var nameIndex = headers.indexOf("name");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        if (currentline.length > latIndex && currentline.length > lngIndex) {
            var latitude = parseFloat(currentline[latIndex]);
            var longitude = parseFloat(currentline[lngIndex]);
            var name = currentline[nameIndex];

            if (!isNaN(latitude) && !isNaN(longitude)) {
                obj["type"] = "Feature";
                obj["properties"] = { "name": name };
                obj["geometry"] = {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                };
                result.push(obj);
            }
        }
    }

    return {
        "type": "FeatureCollection",
        "features": result
    };
}

function loadCsvDataOnMap(url, iconUrl) {
    fetch(url)
        .then(response => response.text())
        .then(csvText => {
            var geoJsonData = csvToGeoJson(csvText);

            // Clear existing markers before adding new ones
            clearMarkers();

            L.geoJSON(geoJsonData, {
                pointToLayer: function(feature, latlng) {
                    var icon = L.icon({
                        iconUrl: iconUrl,
                        iconSize: [25, 25], // You can adjust the size
                        // ... other icon properties ...
                    });

                    var marker = L.marker(latlng, { icon: icon }).bindPopup(feature.properties.name);
                    currentMarkers.push(marker);
                    return marker;
                }
            }).addTo(map);
        })
        .catch(error => console.error('Error loading CSV data:', error));
}

    function clearMarkers() {
        // Remove each marker from map and clear the array
        currentMarkers.forEach(function(marker) {
            map.removeLayer(marker);
        });
        currentMarkers = [];
    }

    function switchLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
        document.querySelectorAll('[data-translate]').forEach(function(elem) {
            var key = elem.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                elem.textContent = translations[lang][key];
            }
        });
    }

    function loadInitialLanguage() {
        var savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage) {
            document.getElementById('language-dropdown').value = savedLanguage;
            switchLanguage(savedLanguage);
        }
    }

    function addGeoJsonToMap(geoJsonPath, name) {
        return new Promise((resolve, reject) => {
            fetch(geoJsonPath).then(response => response.json()).then(json => {
                if (currentGeoJsonLayer) {
                    map.removeLayer(currentGeoJsonLayer);
                }
                currentGeoJsonLayer = L.geoJSON(json, {
                    style: function(feature) {
                        return name === 'All' ? { color: "#00467F", weight: 3, fillOpacity: 0.2 } : { weight: 3, fillOpacity: 0.2 };
                    },
                    onEachFeature: function(feature, layer) {
                        if (feature.geometry.type === "Point") {
                            map.setView(layer.getBounds().getCenter(), 10);
                        } else {
                            map.fitBounds(layer.getBounds());
                        }
                    }
                }).addTo(map);
                resolve();
            }).catch(error => {
                console.error('Error loading GeoJSON for ' + name, error);
                reject(error);
            });
        });
    }

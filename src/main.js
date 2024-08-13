import dayjs from "dayjs";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; //  assert { type: "css" };
import heatmap from 'heatmap.js'; // This might need adjustment based on the actual package name and export
import 'leaflet-heat'; // Adjust based on the actu

console.log("Hello, World!");
console.log(dayjs().format("{YYYY} MM-DD   HH:mm"));

// 53.551086, 9.993682 Hamburg
//var lat = 53.551086;
//var lng = 9.993682;
var lat = 25.6586;
var lng = -80.3568;

var map = L.map("map").setView([lat, lng], 13);
//const targetUrl = "http://localhost:8180/https/__s__.tile.openstreetmap.org/__z__/__x__/__y__.png?s={s}&z={z}&x={x}&y={y}";
const targetUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

L.tileLayer(targetUrl, {
  maxZoom: 19,
}).addTo(map);

var marker, circle;

var marker = L.marker([lat, lng]); //.bindPopup("You are here").openPopup();
var circle = L.circle([lat, lng], {
  radius: 10,
});
var featureGroup = L.featureGroup([marker, circle]).addTo(map);
var bounds = featureGroup.getBounds();
var mapBounds = map.getBounds();
console.log(
  `mapBounds: ${JSON.stringify(mapBounds)}, bounds: ${JSON.stringify(bounds)}`
);
map.fitBounds(bounds);

// Array to store marker positions
var markerPositions = [];

var cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .8,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lng',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};

// Function to handle map click
function onMapClickLine(e) {
  console.log(`Clicked at: ${e.latlng}, ${JSON.stringify(e.latlng)}`);
  if (markerPositions.length < 2) {
    // Add marker at clicked position
    var newMarker = L.marker(e.latlng).bindPopup(`Position: ${e.latlng.lat}, ${e.latlng.lng}`).addTo(map);
    markerPositions.push(e.latlng);

    if (markerPositions.length === 2) {
      // Create a polyline between the two markers
      var polyline = L.polyline(markerPositions, { color: 'red' }).addTo(map);
    }
  }
  else {
    // Remove all markers and polylines
    markerPositions = [];
  }
}

// Assuming you have already initialized your Leaflet map as 'map'
// Initialize an empty array for heatmap data points
var heatmapData = [];

// Initialize the heatmap layer with some basic options
var heatmapLayer = L.heatLayer([], {
  radius: 20,
  blur: 15,
  maxZoom: 17,
}).addTo(map);

// Modified function to handle map click for heatmap
function onMapClickHeatmap(e) {
  // Convert the clicked position to a heatmap data point
  var newPoint = [e.latlng.lat, e.latlng.lng, 1]; // The '1' represents intensity
  heatmapData.push(newPoint);

  // Update the heatmap layer with the new data
  heatmapLayer.setLatLngs(heatmapData);
}

// Use the modified click handler for the map
map.on('click', onMapClickHeatmap);
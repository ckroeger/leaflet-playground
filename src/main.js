import dayjs from "dayjs";

console.log("Hello, World!");
console.log(dayjs().format("{YYYY} MM-DD   HH:mm"));

// 53.551086, 9.993682 Hamburg
var lat = 53.551086;
var lng = 9.993682;

var map = L.map("map").setView([lat, lng], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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

import dayjs from "dayjs";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; //  assert { type: "css" };

console.log("Hello, World!");
console.log(dayjs().format("{YYYY} MM-DD   HH:mm"));

// 53.551086, 9.993682 Hamburg
var lat = 53.551086;
var lng = 9.993682;

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

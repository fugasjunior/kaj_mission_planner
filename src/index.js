require('file-loader?name=[name].[ext]!./index.html');

import "./styles.scss";
import "./js/loadingOverlay";
import Map from "./js/map";
import Controls from "./js/controls";

const mapElement = document.getElementById("map");
const controlsElement = document.getElementById("map-controls");

let map = null;

// center the map on users location if geolocation is enabled
function geolocationSuccess(pos) {
    renderMap(SMap.Coords.fromWGS84(pos.coords.longitude, pos.coords.latitude));
}

// use Prague's coordinates in case the geolocation fails
function geolocationFailure() {
    renderMap(SMap.Coords.fromWGS84(14.41790, 50.12655));
}

// render the map and its controls
function renderMap(coords) {
    map = new Map(coords);
    const controls = new Controls();
    map.setControls(controls);
    controls.setMap(map);
    map.render(mapElement);
    controls.render(controlsElement);
}

// Geolocation code, upon which the map is rendered
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationFailure);
} else {
    geolocationFailure();
}



var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.380895, lng: -89.247682},
    zoom: 12
  });
}
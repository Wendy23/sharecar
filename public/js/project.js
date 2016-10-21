var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.380895, lng: -89.247682},
        zoom: 12
    });


// Create the search box and link it to the UI element.
    var input = document.getElementById('from');
    var searchBox = new google.maps.places.SearchBox(input);

    var input2 = document.getElementById('to');
    var searchBox2 = new google.maps.places.SearchBox(input2);

// Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
        searchBox2.setBounds(map.getBounds());
    });

    var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        //// Clear out the old markers.
        //markers.forEach(function (marker) {
        //    marker.setMap(null);
        //});
        //markers = [];

        // Fit the bounds within in the map
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            console.log(markers.length);
            bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds);

        // For each place, get the icon, name and location.
        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            console.log("place" + place.formatted_address);

            var reqResult = place.formatted_address;
            var getAreaInfo = reqResult.substring(reqResult.lastIndexOf(",") + 1);

            var ta = document.getElementById('PostalCode');
            ta.value = getAreaInfo;


            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    searchBox2.addListener('places_changed', function () {
        var places = searchBox2.getPlaces();

        if (places.length == 0) {
            return;
        }

        //// Clear out the old markers.
        //markers.forEach(function (marker) {
        //    marker.setMap(null);
        //});
        //markers = [];

        // Fit the bounds within in the map
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            console.log(markers.length);
            bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds);

        // For each place, get the icon, name and location.
        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            console.log("place" + place.formatted_address);

            var reqResult = place.formatted_address;
            var getAreaInfo = reqResult.substring(reqResult.lastIndexOf(",") + 1);
            console.log("geuwi" + getAreaInfo);

            var ta = document.getElementById('PostalCode2');
            ta.value = getAreaInfo;


            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

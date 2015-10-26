/**
 * Created by pixelshade on 26.10.2015.
 */
var myPostition = [48.14364, 17.12288];
var ghosts = [];
var map;
$(function () {
    map = initMap(myPostition);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setUserGeoPosition);
    }
    updateGhostList(myPostition, map)
});

function setUserGeoPosition(position) {
    myPostition[0] = position.coords.latitude;
    myPostition[1] = position.coords.longitude;
    console.log(myPostition);
    updateGhostList(myPostition, map)
}


function updateGhostList(pos) {
    console.log(pos);
    $.getJSON("/ghost/getNear?latitude=" + pos[0] + "&longitude=" + pos[1], function (data) {
        var items = [];
        var pos;
        ghosts  = data;
        $.each(data, function (key, ghost) {
            if (!pos) {
                pos = ghost.obj.location.coordinates;
            }
            L.marker([ghost.obj.location.coordinates[1], ghost.obj.location.coordinates[0]]).addTo(map)
                .bindPopup("<b>" + ghost.obj.name + "</b><br />" + formatContent(ghost.obj.content));
            $('#list').add("<li>"+ghost.name+"</li>");
        });

        map.setView([pos[1],pos[0]]);

    });

}

function formatContent(content){
    if(content.indexOf("http://i.imgur.com/")==0){
        return "<img src=\""+content+"\" width=\"200px\" alt=\"cotent\">";
    }
    return content;
}





function initMap() {
    var map = L.map('map').setView([myPostition[0], myPostition[1]], 12);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'pixelshade.cig8hua3g06d2vhm7x71u9yrn',
        accessToken: 'pk.eyJ1IjoicGl4ZWxzaGFkZSIsImEiOiJjaWc4aHVhYjQwNmVvdmZtOGhnZXh3dGNxIn0.3MRy5pGttkFM59cyDnBvzw'
    }).addTo(map);


//L.marker([51.5, -0.09]).addTo(map)
//    .bindPopup("<b>Hello world!GG</b><br />I am a popup.").openPopup();
//
//L.circle([51.508, -0.11], 500, {
//    color: 'red',
//    fillColor: '#f03',
//    fillOpacity: 0.5
//}).addTo(map).bindPopup("I am a circle.");
//
//L.polygon([
//    [51.509, -0.08],
//    [51.503, -0.06],
//    [51.51, -0.047]
//]).addTo(map).bindPopup("I am a polygon.");


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }


    map.on('click', onMapClick);
    return map;
}
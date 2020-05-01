var lat = "46.52863469527167";
var lon = "2.43896484375";
var macarte = null;
var markerClusters;
var villes = {};

function initMap() {

    var markers = [];


    $('.map-agenda ul li').each(function () {

        villes[ $(this).find('.fiche').find('.title').text()] = {
            "lat": $(this).find('.lat').html(),
            "lon": $(this).find('.lon').html(),
            "fiche": '<div style="padding: 5px 10px;">' + $(this).find('.fiche').html() + '</div>',
        };
        // var Lat = $position.lat() + (Math.random() * (1 - 0.5) / 1500);// * (Math.random() * (max - min) + min);
        // var Lng = $position.lng() + (Math.random() * (1 - 0.5) / 1500);// * (Math.random() * (max - min) + min);
    });

    macarte = L.map('gmaps').setView([lat, lon], 11);
    macarte.setZoom(5)
    markerClusters = L.markerClusterGroup();
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    for (ville in villes) {
        var myIcon = L.icon({
            iconUrl: 'images/marker.png',
            popupAnchor: [15, 0],
        });
        var marker = L.marker([villes[ville].lat, villes[ville].lon], { icon: myIcon }); //
        marker.bindPopup(villes[ville].fiche);
        markerClusters.addLayer(marker);
        markers.push(marker);
    }
    // var group = new L.featureGroup(markers);
    // macarte.fitBounds(group.getBounds().pad(0.5));
    macarte.addLayer(markerClusters);

}
window.onload = function(){
    initMap();
};

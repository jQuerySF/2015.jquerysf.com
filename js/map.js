function initialize() {
  var myLatlng = new google.maps.LatLng(37.78779,-122.42180);
  var mapOptions = {
    zoom: 16,
    center: myLatlng,
    scrollwheel: false,
    mapTypeControl: false
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var contentString = '<div class="venue-marker">'+ 
      '<p class="venue-name">The Regency Ballroom</p>'+ 
      '<p class="venue-address">1300 Van Ness Avenue<br />San Francisco, CA</p>'+ 
      '<a class="venue-link" href="https://goo.gl/maps/dDbua">View on Google Maps</a>'
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'The Regency Ballroom'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
  infowindow.open(map,marker);

  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
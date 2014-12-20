$(document).ready(function(){

  var x = $("#raksha-loc");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.val("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    x.val("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);
  }

  $('.raksha-button').on('click', function(event){

    console.log("form submitted!")  // sanity check
    getLocation();

  });

});

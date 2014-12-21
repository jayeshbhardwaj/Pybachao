$(document).ready(function(){

  // CSRF related stuff CTRL+C CTRL+V
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');

  function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
  }

  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
    }
  });

  // CSRF related stuff ends here

  $('#rakshak-form').on('submit', function(event){

    console.log("form submitted!")  // sanity check
    var loc = {};
    getLocation();
    //rakshak_report(loc);
    event.preventDefault();
  });



});


function getLocation() {
  var position = {}
  if (navigator.geolocation) {
    position = navigator.geolocation.getCurrentPosition(rakshak_report);
  } else {
    message = "Geolocation is not supported by this browser.";
    console.log(message);
  }

  return position;
}


function rakshak_report(position) {
  console.log("rakshak is working!") // sanity check



  console.log(position);

  $.ajax({
    url : "report/", // the endpoint
    type : "POST", // http method
    data : {
              latitude : position.coords.latitude,
              longitude : position.coords.longitude,
              transScore : $('#slider-trans').val(),
              threatScore : $('#slider-threat').val(),
              infraScore : $('#slider-infra').val(),
              addComments : "testing",
              placeId : 123
    }, // data sent with the post request

    // handle a successful response
    success : function(json) {

      console.log("success"); // another sanity check
      console.log(json);
    },

    // handle a non-successful response
    error : function(xhr,errmsg,err) {
      $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
      " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
      console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
    }
  });
};

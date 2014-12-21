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
    rakshak_report();
    event.preventDefault();
  });



});


function rakshak_report() {
  console.log("rakshak is working!") // sanity check
  $.ajax({
    url : "report/", // the endpoint
    type : "POST", // http method
    data : {
              latitude : 12.13,
              longitude : 65.45,
              transScore : 1,
              threatScore : 1,
              infraScore : 1,
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

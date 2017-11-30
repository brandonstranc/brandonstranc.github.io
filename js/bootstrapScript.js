$(document).ready(function() {

	/* ANIMATE CSS...............................*/
	$("nav").addClass("animated bounceInDown");
	$(".fade-in").addClass("animated slideInLeft");


	/* SCROLL TO...............................*/
	$('.scrollTo').on('click', function(e) {

		var linkHref = $(this).attr('href');

		$('html, body').animate( {
			scrollTop: $(linkHref).offset().top
		}, 750);

		e.preventDefault();
	});



	/* QUOTE GEN...............................*/
	var quote;
	var author;
  
    function getNewQuote() {
      $.ajax({
        url: 'https://api.forismatic.com/api/1.0/',
        jsonp: 'jsonp',
        dataType: 'jsonp',
        data: {
          method: 'getQuote',
          lang: 'en',
          format: 'jsonp'
        },
        success: function(response) {
          quote = response.quoteText;
          author = response.quoteAuthor;
          $('#quote').text(quote);
          if (author) {
            $('#author').text('- ' + author);
          } else {
            $('#author').text('- unknown');
          }
        }
      });
    }
	getNewQuote();
  
	$('#newQuote').on('click', function(e) {
    	e.preventDefault();
    	getNewQuote();
	});

	$('#shareToTwitter').on('click', function(e) {
  		e.preventDefault();
  		window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + ' - ' + author));
	});




	/* WEATHER APP...............................*/
	var api = "https://fcc-weather-api.glitch.me/api/current?";
	var lat, lon;
	var tempUnit = 'C';
	var currentTemp;

	if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      api = 'https://fcc-weather-api.glitch.me/api/current?' + lon + '&' + lat;
     
      getWeather();
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  
  
  function getWeather() {
   $.ajax({
    url: api, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTemp = Math.round(result.main.temp);
      $('#temp').on('click', function() {
        if (tempUnit == 'C') {
            currentTemp = Math.round((currentTemp * 9/5) + 32);
            tempUnit = 'F';
            console.log(currentTemp);
            $("#temp").text(currentTemp + String.fromCharCode(176) + tempUnit);
        } else if (tempUnit == 'F') {
            currentTemp = Math.round((currentTemp - 32) * 5/9);
            tempUnit = 'C';
            console.log(currentTemp);
            $("#temp").text(currentTemp + String.fromCharCode(176) + tempUnit);
        }
      });
      $("#temp").text(currentTemp + String.fromCharCode(176) + tempUnit);
      $("#description").text(result.weather[0].main);
    }
   });
  }


});
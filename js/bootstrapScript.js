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



});
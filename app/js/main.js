$(window).load(function() {
  document.getElementById("hideAll").style.display = "none";
});

$(document).ready(function(){
  console.log("Hi! If yoy're interested in code, you can take a look at thit site's repository on github https://github.com/kryshtopa/MonteRules.git");

  watermark.init();
  settings.init();
});

var watermark = (function() {
  var init = function () {
    $('.submit__link').on('click', function() {
      var srct = $('.area__text'),
          srci = $('.area__img'),
          imgH = 600,
          mult = srci.outerHeight() / imgH,
          size = parseInt(srct.css('font-size').slice(0,-2)) / mult,
          colr = srct.css('color'),
          posn = srct.position().top,
          grav = "n";

      text = srct.html();

      $('.area__img').watermark({
        text: text,
        textColor: colr,
        textBg: 'rgba(0, 0, 0, 0)',
        textWidth: srci.outerWidth() / mult - 50,
        outputHeight: imgH,
        gravity: grav,
        textSize: size,
        opacity: 1,
        margin: posn / mult
      });

      $(".settings").css({"min-width": "0%"});
      $(".work").css({"min-width": "100%"});
      $(".ui-slider-handle").hide();
      $('.area__text').hide();
      $('.work__download')
        .show()
        .css({"display": "inline-block"})
        .on('click', function (e) {
          e.preventDefault();

          var a  = document.createElement('a'),
              gh = $('.area__img').attr('src');
          a.href = gh;
          a.download = 'MonteRules.jpeg';

          a.click()
        });
      $('.work__refresh')
        .show()
        .css({"display": "inline-block"})
        .on('click', function (e) {
          e.preventDefault();
          window.location.reload();
        });

    });

  };

  return {
    init : init
  };

}());

var settings = (function() {
  var init = function () {

    $('.add__type').bind('change paste keyup', function() {
      if ($(this).val().length < 300)
      $('.area__text').html($(this).val());
    });

    $('.colorpicker').bind('change', function() {
      $('.area__text').css({"color": $('.colorpicker').val()});
    });

    $('.area__text')
      .draggable({
        // snap: '.area__img',
        axis: "y",
        containment: "parent"
      })
      .position({
        of: ".work__area",
        my: "center center",
        at: "center center"
      });

    $('.text-settings__font-strict').on('click', function(e) {
      e.preventDefault

      $(this).addClass('active');
      $('.text-settings__font-hand').removeClass('active');
      $('.area__text').css({"font-family": "OpenSans-Light"})
    });
    $('.text-settings__font-hand').on('click', function(e) {
      e.preventDefault

      $(this).addClass('active');
      $('.text-settings__font-strict').removeClass('active');
      $('.area__text').css({"font-family": "TeddyBear"})
    });

    $('.colorpicker').colorPicker();

    $(".text-settings__opacity")
        .slider({
          max: 10,
          min: 1,
          value: 10,
          slide: function( event, ui ) {
            // $(".p__slider").html("<p>" + ui.value + "</p>");
            $(".area__text").css("opacity", ui.value/10 );
          }
        })
        .slider("pips", {
          first: "pip",
          last: "pip"
        });

    $(".text-settings__font-size")
        .slider({
          max: 4,
          min: -4,
          value: 0,
          slide: function( event, ui ) {
            // $(".p__slider").html("<p>" + ui.value + "</p>");
            $(".area__text").css("font-size", 20 + ui.value*2 );
          }
        })
        .slider("pips", {
          first: "pip",
          last: "pip"
        });

    $(".photo-settings__opacity ")
        .slider({
          max: 10,
          min: 1,
          value: 10,
          slide: function( event, ui ) {
            $(".area__img").css("opacity", ui.value/10 );
          }
        })
        .slider("pips", {
          first: "pip",
          last: "pip"
        });

    $(".add__addText").on('click', function (e) {
      e.preventDefault();

      $('.popup').bPopup({
        speed: 300,
        transition: 'slideIn',
        transitionClose: 'slideBack',
        onClose: function () {
          // form.trigger("reset");
        }
      });
    })

    $(".popup__item").on('click', function (e) {
      e.preventDefault();

      $('.area__text').html($(this).html());
      $('.add__type').val($(this).html());
      $('.popup').bPopup().close();
    })

    function readURL() {
    	//	rehide the image and remove its current "src",
    	//	this way if the new image doesn't load,
    	//	then the image element is "gone" for now
    	// $('.area__img').attr('src', '').hide();
    	if (this.files && this.files[0]) {
    		var reader = new FileReader();
    		$(reader).load(function(e) {
    			$('.area__img')
    				//	first we set the attribute of "src" thus changing the image link
    				.attr('src', e.target.result)	//	this will now call the load event on the image
    		});
    		reader.readAsDataURL(this.files[0]);
    	}
    }

    //	below makes use of jQuery chaining. This means the same element is returned after each method, so we don't need to call it again
    $('.area__img')
    	//	here we first set a "load" event for the image that will cause it change it's height to a set variable
    	//		and make it "show" when finished loading
    	.load(function(e) {
    		//	$(this) is the jQuery OBJECT of this which is the element we've called on this load method
    		$(this)
    			//	now for the next "method" in the chain, we show the image when loaded
    			.show();	//	just that simple
        $('.area__text')
          .css({"width": $('.area__img').outerWidth() - 50})
          .position({
            of: ".area__img",
            my: "center center",
            at: "center center"
          });
    	})
    	//	with the load event set, we now hide the image as it has nothing in it to start with
    	.hide();	//	done

    $(".add__input").change(readURL);

  };

  return {
    init : init
  };

}());

var areaImg = $('.area__img'),
    areaText = $('.area__text'),
    addInput = $('.add__input'),
    addPhoto = $('.add__addPhoto'),
    colorPicker = $('.colorpicker'),
    popUp = $('.popup'),
    fontStrict = $('.text-settings__font-strict'),
    fontHand = $('.text-settings__font-hand'),
    tipPhoto = $('.tooltip_photo'),
    tipFont = $('.tooltip_font'),
    addType = $('.add__type'),
    submitLink = $('.submit__link');

$(window).load(function() {
  document.getElementById("hideAll").style.display = "none";
  $('.tooltip').show();
});

$(document).ready(function(){
  console.log("Hi! If yoy're interested in code, you can take a look at thit site's repository on github https://github.com/kryshtopa/MonteRules.git");

  watermark.init();
  settings.init();
});

var watermark = (function() {
  var init = function () {
    submitLink.on('click', function(e) {
      e.preventDefault();

      if (areaImg.attr('src').length > 1) {
        var srct = areaText,
        srci = areaImg,
        imgH = 600,
        mult = srci.outerHeight() / imgH,
        size = parseInt(srct.css('font-size').slice(0,-2)) / mult,
        colr = srct.css('color'),
        posn = srct.position().top,
        grav = "n";

        text = srct.html();

        areaImg.watermark({
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
        areaText.hide();

        if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || window.navigator.userAgent.indexOf('Edge/') > 0) {
          $('.work__refresh')
            .show()
            .css({"left": "50%"})
            .on('click', function (e) {
              e.preventDefault();
              window.location.reload();
            });
        } else {
          $('.work__download')
            .show()
            .css({"display": "inline-block"})
            .on('click', function (e) {
              e.preventDefault();

              var link = document.createElement('a');
              var a = areaImg.attr('src');
              link.href = a;
              link.download = 'MonteRules.jpeg';
              document.body.appendChild(link);
              link.click();
            });
          $('.work__refresh')
            .show()
            .css({"display": "inline-block"})
            .on('click', function (e) {
              e.preventDefault();
              window.location.reload();
            });
        }
      } else if (!(window.ActiveXObject) && "ActiveXObject" in window) {
        $(this)
          .addClass('hvr-sweep-to-right');
        addInput
          .css({'width': '100%', 'height': '100%'});
      } else {
        $(this)
          .addClass('hvr-sweep-to-right');
        addInput
          .css({'width': '100%', 'height': '100%'});
        addPhoto
          .addClass('hvr-pulse')
          .css({'padding': '2.8%'});
        tipPhoto
          .css({'left': '-10%', 'top': '-45%'});
      }
    });

  };

  return {
    init : init
  };

}());

var settings = (function() {
  var init = function () {

    addInput.on('click', function() {
      submitLink
        .removeClass('hvr-sweep-to-right');
      addInput
        .focus()
        .css({'width': '47.5%', 'height': '42.5%'});
      addPhoto
        .removeClass('hvr-pulse')
        .css({'padding': "3%"});
      tipPhoto
        .hide();
    });

    addType.bind('change paste keyup', function() {
      if ($(this).val().length < 300)
      areaText.html($(this).val());
    });

    colorPicker.bind('change', function() {
      areaText.css({"color": colorPicker.val()});
    });

    areaText
      .draggable({
        axis: "y",
        containment: "parent"
      })
      .position({
        of: ".work__area",
        my: "center center",
        at: "center center"
      });

    fontStrict.on('click', function(e) {
      e.preventDefault

      tipFont.hide();

      $(this).addClass('active');
      fontHand.removeClass('active');
      areaText.css({"font-family": "OpenSans-Light"})
    });
    fontHand.on('click', function(e) {
      e.preventDefault

      tipFont.hide();

      $(this).addClass('active');
      fontStrict.removeClass('active');
      areaText.css({"font-family": "TeddyBear"})
    });

    colorPicker.colorPicker();
    $('.colorPicker-swatch').on('click', function() {
      $('.tooltip_color').hide();
    });

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

      $('.tooltip_text').hide();
      popUp.bPopup({
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

      areaText.html($(this).html());
      addType.val($(this).html());
      popUp.bPopup().close();
    })

    function readURL() {
    	//	rehide the image and remove its current "src",
    	//	this way if the new image doesn't load,
    	//	then the image element is "gone" for now
    	areaImg.attr('src', '').hide();
    	if (this.files && this.files[0]) {
    		var reader = new FileReader();
    		$(reader).load(function(e) {
    			areaImg
    				//	first we set the attribute of "src" thus changing the image link
    				.attr('src', e.target.result)	//	this will now call the load event on the image
    		});
    		reader.readAsDataURL(this.files[0]);
    	}
    }

    //	below makes use of jQuery chaining. This means the same element is returned after each method, so we don't need to call it again
    areaImg
    	//	here we first set a "load" event for the image that will cause it change it's height to a set variable
    	//		and make it "show" when finished loading
    	.load(function(e) {
    		//	$(this) is the jQuery OBJECT of this which is the element we've called on this load method
    		$(this)
    			//	now for the next "method" in the chain, we show the image when loaded
    			.show();	//	just that simple
        areaText
          .css({"width": areaImg.outerWidth() - 50})
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

jQuery(function($) {

	"use strict";

	var win = $(window);
	var doc = $(document);

	/*----------------------/
	/* MAIN NAVIGATION
	/*---------------------*/

	win.on('scroll', function() {
		if(win.width() > 1024) {
			if(doc.scrollTop() > (win.height() / 2)) {
				setNavbarLight();
			}else {
				setNavbarTransparent();
			}
		}
	});

	function toggleNavbar() {
		if((win.width() > 1024) && (doc.scrollTop() <= win.height())) {
			setNavbarTransparent();
		} else {
			setNavbarLight();
		}
	}

	toggleNavbar();

	win.on('resize', function() {
		toggleNavbar();
	});

	/* Navbar Setting */
	function setNavbarLight() {
		$('.navbar').addClass('navbar-light');
	}

	function setNavbarTransparent() {
		$('.navbar').removeClass('navbar-light');
	}

	// Hide Collapsible Menu
	$('.navbar-nav li a').on('click', function() {
		if($(this).parents('.navbar-collapse.collapse').hasClass('in')) {
			$('#main-nav').collapse('hide');
		}
	});

	$('body').localScroll({
		duration: 2000,
		easing: 'easeInOutExpo',
		offset: -70
	});

	var wow = new WOW();

	wow.init();

	$("#owl-testimonials").owlCarousel({

		slideSpeed : 1000,
		paginationSpeed : 2000,
		singleItem: true,
		items: 1,

		//Autoplay
		autoPlay : 5000,
		stopOnHover : false

	});

	/*----------------------/
	/* MAIN TOP SUPERSIZED
	/*---------------------*/

	if($('.main-top').length > 0) {
		$.supersized({

			// Functionality
			autoplay: 1,				// Slideshow starts playing automatically
			slide_interval: 5000,		// Length between transitions
			transition: 1, 				// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed: 3000,		// Speed of transition

			// Components
			slide_links: 'blank',		// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			thumb_links: 0,				// Individual thumb links for each slide
			slides:  	[				// Slideshow Images
							{image : '', title : '', thumb : '', url : 'https://imgur.com/a/VJY8Iup'},
							{image : 'http://placehold.it/1920x1080', title : '', thumb : '', url : ''},
							{image : 'http://placehold.it/1920x1080', title : '', thumb : '', url : ''}
						],
		});

	}

	/*----------------------/
	/* WORKS
	/*---------------------*/

	/* Init Isotope */

	var $container = $('.isotope');
	$(".work-item").hide();

	win.load(function() {
        $container.isotope({
	      itemSelector: '.work-item'
 		});
    });

    // Filter functions
    var filterFns = {
      // Show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt(number, 10) > 50;
      },
      // Show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match(/ium$/);
      }
    };

    // Bind filter button click
    $('#filters').on('click', 'a', function() {
      var filterValue = $(this).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $container.isotope({ filter: filterValue });
      $("#purchase").fadeOut('fast');
    });

    // Change is-checked class on buttons
    $('.filter_group').each( function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'a', function() {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });

	var originalTitle, currentItem;

	$('.media-popup').magnificPopup({
		type: 'image',
		callbacks: {
			beforeOpen: function() {
				// modify item title to include description
				currentItem = $(this.items)[this.index];
				originalTitle = currentItem.title;
				currentItem.title = '<h3>' + originalTitle + '</h3><hr />' + '<p>' + $(currentItem).parents('.work-item').find('img').attr('alt') + '</p>';

				// adding animation
				this.st.mainClass = 'mfp-fade';
			},
			close: function() {
				currentItem.title = originalTitle;
			}
		}

	});

	$(".work-item").slice(0, 6).show();
	$("#purchase .btn").on('click', function (e) {
        e.preventDefault();
        $(".work-item:hidden").slice(0, 3).fadeIn('fast');
        $container.isotope({
	      itemSelector: '.work-item'
 		});
        if($(".work-item:hidden").length == 0) {
            $("#purchase").fadeOut('fast');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });

	/*----------------------/
	/* SCROLL TO TOP
	/*---------------------*/

	if(win.width() > 992) {
		win.scroll(function() {
			if($(this).scrollTop() > 300) {
				$('.back-to-top').fadeIn();
			} else {
				$('.back-to-top').fadeOut();
			}
		});

		$('.back-to-top').on('click', function(e) {
			e.preventDefault();

			$('body, html').animate({
				scrollTop: 0
			}, 1500, 'easeInOutExpo');
		});
	}

	if(!navigator.userAgent.match("Opera/")) {
		$('body').scrollspy({
			target: '#main-nav'
		});
	}else{
		$('#main-nav .nav li').removeClass('active');
	}

});

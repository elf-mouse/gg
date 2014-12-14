var app = {
	manifest: null,
	preload: null,
	images: null,
	map: null,
	loadingCallback: null,
		
	init:function() {		
		var home = $('#home');
			offset = home.offset(),
			windowHeight = $(window).innerHeight(),
			containerHeight = $('#home').innerHeight();
			
		// Redirection
		if($(window).width() < 768) {
			//window.location = "http://burn.local/mobile";
			window.location = $('body').attr('data-mobile');
			return;
		}
		$(window).resize(function() {
			if($(window).width() < 768) {
				//window.location = "http://burn.local/mobile";
				window.location = $('body').attr('data-mobile');
				return;
			}
		});
		
		if(containerHeight < windowHeight) {
			$('.block-top-position').css('top', -(((windowHeight - containerHeight) / 2) + $('.block').height()));
	       	$('.block-bottom-position').css('top', $(window).height());
		}
		else {
			$('.block-top-position').css('top', -$('.block').height());
	       	$('.block-bottom-position').css('top', $(window).height());
		}
       		
		app.loadingCallback = function() {
			/*$('body').removeClass('loading').delay(700).queue(function() {
       			$(this).removeClass('hide-block-content');
       			$(this).dequeue();
       		});*/
       		
       		var passage = 0,
   				animation = setInterval(function() {
   					i = passage;
   					$('.block').eq(i).removeAttr('style');
   					passage++;
   					
	   				if (passage == 6) {
	   					clearInterval(animation);
	   					$('body').delay(350).queue(function() {
	   						$(this).removeClass('loading hide-block-content');
	   						$(this).dequeue();
	   					});
	   				};
	   			}, 100);
		}
			
		// Preload
		app.reload($('body'));
		app.loadAll();
			
		app.performLogin();
		app.performRegister();
	},
	
	reload:function(elem) {
		app.map = new Array();
		app.images = new Array();

		elem.find('img').each(function() {
			app.images.push($(this).attr('src'));
		});

		// If there is an open preload queue, close it.
        if (app.preload != null) { 
            app.preload.close(); 
        }

        app.manifest = app.images;

        // Create a preloader. There is no manfest added to it up-front, we will add items on-demand.
        app.preload = new createjs.LoadQueue();
        app.preload.onFileLoad = app.handleFileLoad;
        app.preload.onProgress = app.handleOverallProgress;
        app.preload.onFileProgress = app.handleFileProgress;
        app.preload.onError = app.handleFileError;
        app.preload.setMaxConnections(5);
	},

	loadAll:function() {
		while (app.manifest.length > 0) {
            app.loadAnother();
        }
	},

	loadAnother:function() {
		// Get the next manifest item, and load it
        var item = app.manifest.shift();
        app.preload.loadFile(item);
	},

	// File complete handler
    handleFileLoad:function(event) {
		// Get a reference to the loaded image (<img/>)
        var img = event.result;
        
        // getting the images and their index for later sorting
        app.map[app.map.length] = {'src':String(String(event.src).toLowerCase()).replace('assets/image','').replace('.jpg','').replace('.png',''),'data':img};
        
        // checking to see if all images have been loaded. 
        // sometimes when images are cached preloadJS fires 100% but there are still some images missing
        if(app.map.length < app.images.length){
            
        }
        else{
            if(app.preload.progress == 1){
                //stop();
                
               	$('#loader').delay(400).queue(function() {
               		$(this).fadeOut(500, function() {               		
               			app.loadingCallback();
               		});
               		$(this).dequeue();
               	});
            }
        }            
    },

    // File progress handler
    handleFileProgress:function(event) {
    
    },

    // Overall progress handler
    handleOverallProgress:function(event) {
    	var loader = $('.loaderFake'),
    		position = 92 - Math.ceil(app.preload.progress * 100);
    		
		loader.css('top', position + 'px');
    },

	// An error happened on a file
    handleFileError:function(event) {
        console.log('error');
    },
	
	performLogin:function() {
		$('.btn-play').click(function(e) {
			var game_url = $(this).attr("data-url");

			FB.login(function(response) {
				if (response.authResponse) {
					
					$('#simple-loader').fadeIn();
										
					$.get(game_url, function(response) {
						$('#simple-loader').fadeOut();
						
						if(response != 'ko') {
							var currentBlock = $('.current-showed');
							
							if($(response).filter('form').length > 0) {
								currentBlock.find('.showed').removeClass('showed');
								currentBlock.find('.content-formulaire').html(response).addClass('showed');
								app.performRegister();
								currentBlock.find('.content').scrollTop(0);
							}
							else {						
								currentBlock.find('.showed').removeClass('showed');
								currentBlock.find('.content-result').html(response).addClass('showed');
								currentBlock.find('.content').scrollTop(0);
								app.performShare();
							}
						}
						else {
						}
					});
				} else {
				
				}
			}, { scope: 'email,user_location,user_birthday' });
 
			e.preventDefault();
			return false;
		});
	},
	
	performRegister:function() {	
		// Uniform
		$('input[type="checkbox"], select').uniform();
		
		app.showHideValideButton();
			
		$('.boutonValider').on('click', function(e) {
			var errors = 0,
				form = $('form'),
				required = form.find('input[data-required="1"], textarea[data-required="1"]'),
				email = form.find('input.email'),
				day = form.find('select.day'),
				month = form.find('select.month'),
				year = form.find('select.year');
				
			required.each(function() {
				if($(this).val() == '') {
					$(this).parent().parent().addClass('error');
					errors++;
				}
				else {
					$(this).parent().parent().removeClass('error');
				}
			});
			
			if(app.checkEmail(email.val()) === false || email.val() == '') {
				email.parent().parent().addClass('error');
				errors++;
			}
			else {
				email.parent().parent().removeClass('error');
			}
			
			if(day.val() == '' || month.val() == '' || year.val() == '') {
				$('.birthdate').addClass('error');
				errors++;
			}
			else {
				$('.birthdate').removeClass('error');
			}
			
			if(errors == 0) {
				$('#simple-loader').fadeIn();
				
				$.ajax({
					async:true, 
					data:form.serialize(), 
					dataType:"html", 
					
					success:function (data, textStatus) {
						$('#simple-loader').fadeOut();
						
						var currentBlock = $('.current-showed');
						
						if($(data).filter('form').length > 0) {
							currentBlock.find('.content-formulaire').html(data);
							app.performRegister();
						}
						else {						
							currentBlock.find('.showed').removeClass('showed');
							currentBlock.find('.content-result').html(data).addClass('showed');
							
							app.performShare();
						}
					}, 
					type:"POST", 
					url:form.attr('action')
				});
			}
			
			e.preventDefault();
			return false;
		});
	},
	
	showHideValideButton:function() {
		$('input[type="checkbox"]').change(function() {
			var button = $('.boutonValider'),
				checks = $('input[type="checkbox"]:checked');
			
			if(checks.length == 2) {
				button.parent().addClass('button-show');
				button.show().delay(1).queue(function() {
					$(this).css('opacity', 1);
					$(this).dequeue();
				});	
			}	
			else {
				button.parent().removeClass('button-show');
				button.css('opacity', 0).delay(350).queue(function() {
					$(this).hide();
					$(this).dequeue();
				});
			}
		});
	},
	
	checkEmail:function(email) {
		var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');

		return reg.test(email);
	},
	
	getURLParameter:function(name) {
    	return decodeURI(
        	(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    	);
	},
	
	performShare:function() {
		$('.boutonFacebook').click(function(e) {
			FB.ui({
			  method: 'feed',
			  link: $(this).attr('data-link'),
			  picture: $('meta[property="og:image"]').attr('content'),
			  name: 'Jeu concours #burnF1',
			  caption: 'burn x LotusF1Team',
			  description: 'Découvrez l\'univers #burnF1 et gagnez un des nombreux lots mis en jeu ! Flashez la can burn Lotus F1 Team collector pour accéder aux lots premium !'
			});

			e.preventDefault();
			return false;
		});
		
		$('.boutonTwitter a').click(function(e) {
			var width  = 575,
		        height = 400,
		        left   = ($(window).width()  - width)  / 2,
		        top    = ($(window).height() - height) / 2,
		        url    = $(this).attr('href'),
		        opts   = 'status=1' +
		                 ',width='  + width  +
		                 ',height=' + height +
		                 ',top='    + top    +
		                 ',left='   + left;
		    
		    window.open(url + '&text=' + encodeURIComponent('Participez au jeu #burnF1 et gagnez un des nombreux lots @burn_fr x @Lotus_F1Team !'), 'twitter', opts);
			
			e.preventDefault();
			return false;
		});
	},
		
	home: {
		init:function() {
			app.home.fixContainerPosition();
			$(window).resize(function() {
				app.home.fixContainerPosition();
			});
			
			app.home.initNav();			
			app.home.manageSprites();
			app.home.managePagination();
			app.home.managePicturesSliders();
			app.home.changeGamePages();
			
			app.home.initDatepicker();
		},
		
		fixContainerPosition:function() {
			var windowHeight = $(window).innerHeight(),
				containerHeight = $('#home').innerHeight();
				
			if(containerHeight < windowHeight) {
				$('#content').css({
					'padding-top': (windowHeight - containerHeight) / 2
				});
			}
			else {
				$('#content').css({
					'padding-top': 0
				});
			}
		},
		
		initNav:function() {
			// Show / change category
			$('.block .home-screen a, header nav .blocNav a').click(function(e) {
				var block, href = $(this).attr('href').split('#');
								
				if($(this).parents('nav').length > 0) {
					var index = $('header nav .blocNav a').index(this);
					block = $('.block').eq(index + 1);
					
					if($(this).hasClass('current-selected')) {
						return;
					}
				}
				else {
					block = $(this).parents('.block');
					
					if(block.hasClass('block-burn')) {
						return;
					}
				}
				
				// Set default
				$('.block.current-showed').removeClass('current-showed');
				$('header .current-selected').removeClass('current-selected');
					
				var blockIndex = $('.block').index(block);
				
				// Nav
				$('header nav .blocNav').each(function(i) {
					var block = $(this);
					
					setTimeout(function() {
						block.removeClass('first-load');	
					}, 80 * i);
				});
				
				$('header nav .blocNav').eq(blockIndex - 1).addClass('current-selected');
					
				// Deploy block
				block.addClass('current-showed');
								
				$('body').removeClass().addClass(href[1]).addClass('cat-showing').delay(350).queue(function() {
					$(this).addClass('cat-showed').removeClass('cat-showing');
					$(this).dequeue();
					
					var currentBlock = $('div.current-showed'),
						picturesContainer = currentBlock.find('.pictures-container');
						
						if(picturesContainer.length > 0) {
							var hasControls = picturesContainer.attr('has-controls').split(','),
								picturesControls = currentBlock.find('.slider-controls');
						
							app.home.showControls(picturesControls, hasControls, 0);
						}
				});
			
				e.preventDefault();
				return false;
			});

			// Close
			$('.btn-close a').click(function(e) {
				var currentBlock = $(this).parents('.block');
				
				currentBlock.find('.page-screen').removeClass('hide-text');
				currentBlock.find('.content-slider').css('left', 0);
				currentBlock.find('.page-title .showed').removeClass('showed');
				currentBlock.find('.page-title h3').eq(0).addClass('showed');
				currentBlock.find('.pictures-container').removeAttr('style');
				currentBlock.find('.pictures-belt').css('left', -600);
				currentBlock.find('.el.current-showed').removeClass('current-showed');
				currentBlock.find('.el').eq(0).addClass('current-showed');
				currentBlock.find('.slider-controls').removeClass('showed can-zoom');
				currentBlock.find('.pages-titles .showed').removeClass('showed');
				currentBlock.find('.pages-titles a').eq(0).addClass('showed');
				
				var swiper = currentBlock.find('.swiper-container').data('swiper');
				if(swiper) {
					swiper.swipeTo(0);
				}
				
				// Hide navigation
				var y = $('header nav .blocNav').length;
				$('header nav .blocNav').each(function(i) {
					var block = $('header nav .blocNav').eq(y - 1);
					
					setTimeout(function() {
						block.addClass('first-load');	
					}, 80 * i);
					y--;
				});
				
				$('body').removeClass();
				$('.block.current-showed').removeClass('current-showed');
				
				setTimeout(function() {
					$('header .current-selected').removeClass('current-selected');
				}, 80 * $('header nav .blocNav').length);
				
				e.preventDefault();
				return false;
			});
		},
		
		manageSprites:function() {
			// Sprites
			if(!$('html').hasClass('touch')) {
				$('.sprite').each(function() {
					var block = $(this).parents('.block'),
						columns = $(this).attr('data-columns'),
						duration = $(this).attr('data-duration');
					
					$(this).animateSprite({
						columns: columns,
						totalFrames: columns,
						duration: duration,
						loop: false,
						complete: function(){
							if(block.hasClass('block-burn')) {
								block.find('.sprite').remove();
								block.find('.image').show();
							}
						}
					}).animateSprite('stopAnimation');
				});
				
				$('.block .home-screen').hover(function() {
					if($(this).parent().hasClass('block-burn')) {
	  					$(this).parent().find('.sprite').animateSprite('restartAnimation');
					}
					else {
						$(this).parent().find('.sprite').animateSprite('restartAnimation');
					}
				}, function() {
				});
			}
		},
		
		managePagination:function() {
			$('.pages-titles a').click(function(e) {
				if($(this).hasClass('showed')) {
					var currentBlock = $('div.current-showed'),
						currentIndex = currentBlock.find('.pages-titles a').index(this),
						numberOfPages = currentBlock.find('.pages-titles a').length,
						contentWidth = currentBlock.find('.content-pictures').width(),
						targetIndex = 0,
						contentSlider = currentBlock.find('.content-slider');
						
					// Hide
					$(this).removeClass();
					currentBlock.find('.page-title h3.showed').removeClass();
					
					if(currentIndex == numberOfPages - 1)
						targetIndex = 0;
					else
						targetIndex++;
					
					// Show
					$(this).parent().find('a').eq(targetIndex).addClass('showed');
					currentBlock.find('.page-title h3').eq(targetIndex).addClass('showed');
					
					
					// Pictures
					var picturesContainer = currentBlock.find('.pictures-container');
					
					if(picturesContainer.length > 0) {
						picturesContainerWidth = currentBlock.find('.content-pictures').width(),
						hasControls = picturesContainer.attr('has-controls').split(','),
						picturesControls = currentBlock.find('.slider-controls');
						
						currentBlock.find('.page-screen').removeClass('hide-text');
						picturesControls.removeClass('can-zoom');
					
						picturesContainer.find('> .current-showed').removeClass('current-showed');
						picturesContainer.find('.el').eq(targetIndex).addClass('current-showed');
						
						picturesContainer.css('left', '-' + targetIndex * contentWidth + 'px');
						
						app.home.showControls(picturesControls, hasControls, targetIndex);
					}		
					
					$.each(currentBlock.find('.swiper-container'), function() {
						var swiper = $(this).data('swiper');
						
						if(swiper) {
							swiper.swipeTo(0);
						}
					});		
				}
				
				e.preventDefault();
				return false;
			});
		},
		
		managePicturesSliders:function() {
			$('.block .swiper-container').each(function() {
				$(this).swiper({
					mode:'horizontal',
					speed: 500,
					loop: true,
					resistance: '100%',
					onSlideChangeStart: function(swiper) {
						onSlideChange(swiper);
					},
					onSlideChangeEnd: function(swiper) {
						onSlideChange(swiper);
					},
					onSlideReset: function(swiper) {
						onSlideChange(swiper);
					}
				});
			});
			
			function onSlideChange(swiper) {
				var slide = swiper.activeSlide(),
					hasZoom = $(slide).attr('attr-zoom'),
					currentBlock = $(slide).parents('.block'),
					picturesControls = currentBlock.find('.slider-controls');
					
				if(hasZoom == "true") {
					currentBlock.find('.page-screen').addClass('hide-text');
					picturesControls.addClass('can-zoom');
				}
				else {
					currentBlock.find('.page-screen').removeClass('hide-text');
					picturesControls.removeClass('can-zoom');
				}
			}
			
			$('.slider-controls a').click(function(e) {
				
				var swiper = $(this).parents('.block').find('.swiper-container.current-showed').data('swiper');

				if(!$(this).parent().hasClass('btn-zoom')) {

					if($(this).parent().hasClass('btn-prev')) { 
						swiper.swipePrev();
					}
					else {
						swiper.swipeNext();	
					}
				}
				else {
					var bigImageUrl = $(swiper.activeSlide()).find('img').attr('attr-big');
					
					if(bigImageUrl) {
						var map = new Array(),
							image = new Array(),
							manifest;

							image.push(bigImageUrl);
				
				        	manifest = image;
        
        				$('#simple-loader').fadeIn();
        
						var queue = new createjs.LoadQueue();
						
						queue.addEventListener("complete", function() {
							var image = queue.getResult("image");
     						$('#big-image').empty().append(image);
     						
     						$('#simple-loader').fadeOut();
     						$('#big-overlay').show();
     						$('#big-image').show();
     						
     						$('body').delay(250).queue(function() {
     							$(this).addClass('show-big-image');
     							app.home.hideBigImage();
     							
     							$(this).dequeue();
     						});
						});
						
						queue.loadManifest([
							{id: "image", src:bigImageUrl}
						]);
					}
				}
				
				e.preventDefault();
				return false;
			});
		},
		
		hideBigImage:function() {
			$('.show-big-image').on('click touchstart', function(e) {
				$(this).removeClass('show-big-image').delay(350).queue(function() {
					$('#big-overlay').hide();
					$('#big-image').hide();
					$(this).dequeue();
				});
			});
		},
		
		showControls:function(picturesControls, array, targetIndex) {
			// Show sliders controls ?
			if(array && $.inArray(targetIndex.toString(), array) !== -1) {
				picturesControls.addClass('showed');
			}
			else {
				picturesControls.removeClass('showed');
			}
		},
		
		changeGamePages:function() {
			$('.btn-details').click(function(e) {
				var currentBlock = $('div.current-showed');
				
				currentBlock.find('.contents .showed').removeClass('showed');
				currentBlock.find('.content-lots').eq(0).addClass('showed');
				
				e.preventDefault();
				return false;
			});
		},
		
		initDatepicker:function() {
			var activeDays = [
				"2013-03-24",
				"2013-04-14",
				"2013-04-21",
				"2013-05-12",
				"2013-05-26",
				"2013-06-09",
				"2013-06-30",
				"2013-07-07",
				"2013-07-28",
				"2013-08-25",
				"2013-09-08",
				"2013-09-22",
				"2013-10-06",
				"2013-10-13",
				"2013-10-27",
				"2013-11-03",
				"2013-11-17",
				"2013-11-24",
			];
			
			$("#datepicker").datepicker({
				dateFormat: 'yy-mm-dd',
				yearRange: "2013:2013",
				changeYear: false,
				monthNames: [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
				dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ],
				firstDay: 1,
				beforeShowDay:function(date) {
					var m = date.getMonth(), d = date.getDate(), y = date.getFullYear();
						
		            for (i = 0; i < activeDays.length; i++) {
		                if($.inArray(y + '-' + ("0" + (m + 1)).slice(-2) + '-' + ("0" + d).slice(-2),activeDays) != -1) {
		                    //return [false];
		                    return [true, 'date-selected', ''];
		                }
		            }
		            return [false, ""];
				},
				onSelect:function(dateText, inst) {
					var index = $.inArray(dateText, activeDays);
					$('.circuits tr.selected').removeClass('selected');
					if(index !== -1) {
						$('.circuits tr').eq(index + 1).addClass('selected');
					}
				}
			});
		}
	},
	
	/*
	 * MOBILE
	 */
	mobile: {
		swipers: [],
		
		init:function() {
			// Redirection
			if($(window).width() >= 768) {
				//window.location = "http://burn.local/mobile";
				window.location = $('body').attr('data-full');;
				return;
			}
			$(window).resize(function() {
				if($(window).width() >= 768) {
					//window.location = "http://burn.local/mobile";
					window.location = $('body').attr('data-full');
					return;
				}
			});
			
			app.loadingCallback = function() {
				app.mobile.loadHome();
			}
			
			app.mobile.fixContentsSize();
			$(window).resize(function() {
				app.mobile.fixContentsSize();
			});
			
			app.mobile.manageNavigation();
			app.mobile.manageSwipers();
			app.mobile.activeGameSwiper();
			app.mobile.managePagination();
			
			app.performLogin();
			app.performRegister();
			
			// Preload
			app.reload($('body'));
			app.loadAll();
		},
		
		loadHome:function() {
			$('.block').eq(0).css({
				'-webkit-transform': 'translate3d(0%, 0, 0)',
				'-moz-transform': 'translate3d(0%, 0, 0)',
				'-ms-transform': 'translate3d(0%, 0, 0)',
				'-o-transform': 'translate3d(0%, 0, 0)',
				'transform': 'translate3d(0%, 0, 0)',
			});
			
			$('.block:gt(0)').each(function(e) {
				var block = $(this);
				setTimeout(function() {
					block.css({
						'-webkit-transform': 'translate3d(100%, 0, 0)',
						'-moz-transform': 'translate3d(100%, 0, 0)',
						'-ms-transform': 'translate3d(100%, 0, 0)',
						'-o-transform': 'translate3d(100%, 0, 0)',
						'transform': 'translate3d(100%, 0, 0)',
					});
				}, e * 150);
			});
			
			$('.block-mentions').delay((150 * ($('.block').length - 1))).queue(function() {
				$(this).addClass('showed');
				$(this).dequeue();
			});
			
			$('.block-game').delay((150 * ($('.block').length - 1)) + 250).queue(function() {
				$(this).css({
					'-webkit-transform': 'translate3d(0%, 0, 0)',
					'-moz-transform': 'translate3d(0%, 0, 0)',
					'-ms-transform': 'translate3d(0%, 0, 0)',
					'-o-transform': 'translate3d(0%, 0, 0)',
					'transform': 'translate3d(0%, 0, 0)',
				});
				$(this).dequeue();
			});
		},
		
		manageNavigation:function() {
			$('.block:gt(0) a').on('click touchstart', function(e) {
				var href = $(this).attr('href').split('#');
				
				$('#page-overlay').fadeIn(350);
				
				$('body').addClass(href[1]);
				
				$('section#' + href[1]).addClass('current-showed');

				e.preventDefault();
				return false;
			});
			
			$('.btn-close').on('click touchstart', function(e) {
				$('section.current-showed').removeClass();
				$('body').removeClass();
				
				$('#page-overlay').delay(50).queue(function() {
					$(this).fadeOut(350);
					$(this).dequeue();
				});
				
				e.preventDefault();
				return false;
			});
			
			/*$('section#lotus .col-left, section#story .col-left, section#artiste .col-left').on('swipedown', function() {
				$('#page-overlay').hide();
				$('section.current-showed').removeClass();
				$('body').removeClass();
			});*/
		},
		
		fixContentsSize:function() {
			// Fix titles size
			$('section:lt(5)').each(function() {
				
				if($(this).attr('id') == 'lotus') {
					var colLeft = $(this).find('.first-slide .col-left').eq(0),
						colRight = $(this).find('.first-slide .col-right').eq(0);
						
					$(this).find('.pictures-slider').width($(window).width());
					$(this).find('.sliders').width($(window).width() * 2);
					
					$(this).find('nav h3').css('width', $(window).width() * 37.5 / 100);
					$(this).find('.titles h3').css('width', $(window).width() * 62.5 / 100);
				}
				else {
					var colLeft = $(this).find('.col-left'),
						colRight = $(this).find('.col-right');
					
					$(this).find('.col-left .slider img').css('width', $(window).width() * 37.5 / 100);
					$(this).find('.text').css('width', $(window).width() * 62.5 / 100);	
					
					$(this).find('nav h3').css('width', $(window).width() * 37.5 / 100);
					$(this).find('.titles h3').css('width', $(window).width() * 62.5 / 100);
					
					$(this).find('.table').css('width', $(window).width());
				
				}
			});
		},
		
		manageSwipers:function() {
			var swiper = $('section:eq(1), section:eq(2), section:eq(3)').each(function() {
				$(this).find('.swiper-container').each(function() {
					$(this).swiper({
						mode:'horizontal',
						loop: true,
						speed: 500,
						resistance: '100%'
					});
				});
			});
		},
		
		activeGameSwiper:function() {
			$('#game .swiper-container').swiper({
				mode:'horizontal',
				loop: false,
				speed: 500,
				pagination: '#game .pagination'
			});
		},
		
		managePagination:function() {
			$('nav h3 a').on('click touchstart', function(e) {
				var currentBlock = $('section.current-showed'),
					currentIndex = currentBlock.attr('current-index'),
					targetIndex = currentIndex,
					belts = currentBlock.find('.belt');
					
				if(currentIndex == 0) {
					targetIndex++;
					
					if($(this).parents('section#lotus').length > 0) {
						$(this).parents('section').find('.swiper-container').each(function() {
							var swiper = $(this).data('swiper');
							
							if(swiper) {
								//swiper.params.onlyExternal = false;
								swiper.swipeTo(0);
							}
						});
					}
				}
				else {
					targetIndex--;
					
					if($(this).parents('section#lotus').length > 0) {
						$(this).parents('section').find('.swiper-container').each(function() {
							var swiper = $(this).data('swiper');
							
							if(swiper) {
								//swiper.params.onlyExternal = false;
								swiper.swipeTo(0);
							}
						});
					}
				}
				
				currentBlock.attr('current-index', targetIndex);
				
				belts.each(function() {
					var width = $(this).parent().width(),
						pos = -(width * targetIndex);
					
					$(this).css({
						'-webkit-transform': 'translate3d(' + pos + 'px, 0, 0)',
						'-moz-transform': 'translate3d(' + pos + 'px, 0, 0)',
						'-ms-transform': 'translate3d(' + pos + 'px, 0, 0)',
						'-o-transform': 'translate3d(' + pos + 'px, 0, 0)',
						'transform': 'translate3d(' + pos + 'px, 0, 0)',
					});
				});
				
				e.preventDefault();
				return false;
			});
		}
	}
}

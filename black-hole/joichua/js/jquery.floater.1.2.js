/*
 * DC jQuery Floater - jQuery Floater
 * Copyright (c) 2011 Design Chemical
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){

	//define the new for the plugin ans how to call it
	$.fn.dcFloater = function(options) {

		//set default options
		var defaults = {
			classWrapper: 'dc-floater',
			classContent: 'dc-floater-content',
			width: 200,
			idWrapper: 'dc-floater-'+$(this).index(),
			location: 'top', // top, bottom
			align: 'left', // left, right
			offsetLocation: 10,
			offsetAlign: 10,
			speedFloat: 1500,
			speedContent: 600,
			tabText: 'Click',
			event: 'click',
			classTab: 'tab',
			classOpen: 'dc-open',
			classClose: 'dc-close',
			classToggle: 'dc-toggle',
			autoClose: true,
			tabClose: true,
			easing: 'easeOutQuint'
		};

		//call in the default otions
		var options = $.extend(defaults, options);
		
		//act upon the element that is passed into the design    
		return this.each(function(options){

			var floatHtml = $(this).html();
			var floatTab = '<div class="'+defaults.classTab+'"><span>'+defaults.tabText+'</span></div>';
			$(this).hide();
			var idWrapper = defaults.idWrapper;

			if(defaults.location == 'bottom'){
				var objHtml = '<div id="'+idWrapper+'" class="'+defaults.classWrapper+' '+defaults.location+' '+defaults.align+'"><div class="'+defaults.classContent+'">'+floatHtml+'</div>'+floatTab+'</div>';
			} else {
				var objHtml = '<div id="'+idWrapper+'" class="'+defaults.classWrapper+' '+defaults.align+'">'+floatTab+'<div class="'+defaults.classContent+'">'+floatHtml+'</div></div>';
			}			
			$('.outer').append(objHtml);
	
			/* FOR Screen Resolution less then 1280  hide the left menu and enable the top menu*/
			 
			if ($(window).width() <= 1280)
			{  					
				$(".dc-floater").hide();	
				$("#top-navigation").show();

			}			

			/* FOR Screen resize less then 1280  hide the left menu and enable the top menu*/
			$(window).resize(function(){				
				var w = $(window).width();				
				if (w <= 1280){  					
					$(".dc-floater").hide();	
					$("#top-navigation").show();
				}
				else{
					$(".dc-floater").css({"top":"100px"});
					$(".dc-floater").show();					
					$("#top-navigation").hide();						
				}
			 });
			/* END*/
	
			//cache vars
			var $floater = $('#'+idWrapper);
			var $tab = $('.'+defaults.classTab,$floater);
			var $content = $('.'+defaults.classContent,$floater);
			var linkOpen = $('.'+defaults.classOpen);
			var linkClose = $('.'+defaults.classClose);
			var linkToggle = $('.'+defaults.classToggle);
			
			$floater.css({width: defaults.width+'px', position: 'absolute', zIndex: 10000});
			
			var h_c = $content.outerHeight(true);
			var h_f = $floater.outerHeight();
			var h_t = $tab.outerHeight();
			
			if(defaults.tabClose == true){
				$content.hide();
			}
			
			floaterSetup($floater);
		
			var start = $('#'+idWrapper).position().top;
			
			floatObj();
			
			$(window).scroll(function () {
				floatObj();
			});
			
			if(defaults.tabClose == true){
			// If using hover event
			if(defaults.event == 'hover'){
				// HoverIntent Configuration
				var config = {
					sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)
					interval: 100, // number = milliseconds for onMouseOver polling interval
					over: floatOpen, // function = onMouseOver callback (REQUIRED)
					timeout: 400, // number = milliseconds delay before onMouseOut
					out: floatClose // function = onMouseOut callback (REQUIRED)
				};
				$floater.hoverIntent(config);
			}
			
			// If using click event
			if(defaults.event == 'click'){
				
				$tab.click(function(e){
					if($floater.hasClass('active')){
						floatClose();
					} else {
						floatOpen();
					}
					e.preventDefault();
				});
				
			}
			
			$(linkOpen).click(function(e){
				if($floater.not('active')){
					floatOpen();
				}
				e.preventDefault();
			});
				
			$(linkClose).click(function(e){
				if($floater.hasClass('active')){
					floatClose();
				}
				e.preventDefault();
			});
				
			$(linkToggle).click(function(e){
				if($floater.hasClass('active')){
					floatClose();
				} else {
					floatOpen();
				}
				e.preventDefault();
			});
			
			// Auto-close
			if(defaults.autoClose == true){
	
				$('body').mouseup(function(e){
					if($floater.hasClass('active')){
						if(!$(e.target).parents('#'+defaults.idWrapper+'.'+defaults.classWrapper).length){
							floatClose();
						}
					}
				});
			}
			} else {
				// Add active class if tabClose false
				$floater.addClass('active');
			}
			
			function floatOpen(){
			
				$('.'+defaults.classWrapper).css({zIndex: 10000});
				$floater.css({zIndex: 10001});
				var h_fpx = h_c+'px';
				
				if(defaults.location == 'bottom'){
					
					$content.animate({marginTop: '-'+h_fpx}, defaults.speed).slideDown(defaults.speedContent);
				} else {
					$content.slideDown(defaults.speedContent);
				
				}
				$floater.addClass('active');
			}
			
			function floatClose(){
				$content.slideUp(defaults.speedContent, function(){
					$floater.removeClass('active');
				});
			}
			
			function floatObj(){
			
				var scroll = $(document).scrollTop();
				var moveTo = start + scroll;
				var h_b = $('body').height();
				var h_f = $floater.height();
				var h_c = $content.height();
			//	alert('window height: '+h_b+' object height: '+h_f+' content height: '+h_c);
				if (h_b < h_f + h_c){
					$floater.css("top",start);
				} else {
					$floater.stop().animate({top: moveTo}, defaults.speedFloat, defaults.easing);
				}
			}
			
			// Set up positioning
			function floaterSetup(obj){
			
				
				
				var location = defaults.location;
				var align = defaults.align;
				var offsetL = defaults.offsetLocation;
				var offsetA = defaults.offsetAlign;
				
				if(location == 'top'){
					$(obj).css({top: offsetL});
				} else {
					$(obj).css({bottom: offsetL});
				}
				
				if(align == 'left'){
					$(obj).css({left: offsetA});
				} else {
					$(obj).css({right: offsetA});
				}
			}
			
		});
	};
})(jQuery);

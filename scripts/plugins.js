(function ($) {
	$.fn.scrollSlider = function(options) {
		var settings = $.extend({
			'pause'			: 1500,
			'speed'			: 500,
			'width'			: 320,
			'height'		: 175,
			'nav'			: '',
			'callback'		: function() {/*do something*/ console.log("slide change");}	
		}, options);

		

		//log("width_option = "+settings.width + "; pane_width = "+pane_width +";");
			
				
		return this.each(function() {
			var el = this,
				$el = $(el),
				pane_wrapper = $el.find('ul'),
				panes = pane_wrapper.find('li'),
				pane_count = panes.length,
				firstSlidePosition = 0,
				pane_locations = [],
				slideLocation = {
					'first'				: 0,
					'currentSlide'		: 0,
					'next'				: 0
				};
				
			var init = function() {
				pane_wrapper.width(settings.width * pane_count);//	set width to ul
				pane_wrapper.height(settings.height);			//	set height to ul
				panes.each(function() {
					var pane = $(this);
					pane_locations.push({
						'location'		: pane.position().left,
						'caption'		: pane.data('caption')
					})
					log(pane_locations);
				});
				setTimeout(function() {
					nextSlide();
					log('timeout');
				}, settings.pause);
			}
			
			var nextSlide = function() {
				var current = slideLocation.current,
					next
				$el.animate({
					scrollLeft: slideLocation.next	
				}, settings.speed);
				log("slide change");
				//resetTimer(); 
			}	
			
			var slideTimer;
			var	resetTimer = function() {
				if(slideTimer) {
					clearInterval(slideTimer);	
				}
				slideTimer = setInterval(nextSlide(), settings.pause);
			}
			
			//var slideTimer = setInterval(nextSlide(), settings.pause);
			
			if(settings.nav != '') {	//	if navagation specified, link them to slide action
				$(settings.nav).click(function(event) {
					event.preventDefault();
					slideLocation = $(this).attr('href');
					clearInterval(slideTimer);
					nextSlide();
				});
			}

			init();		
		});

	}	
})(jQuery);
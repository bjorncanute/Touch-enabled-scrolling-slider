(function ($) {
	$.fn.scrollSlider = function(options) {
		var settings = $.extend({
			'pause'			: 1500,
			'speed'			: 500,
			'callback'		: function() {/*do something*/ console.log("slide change");}	
		}, options);
		
		var slider_wrapper = this.find('ul'), 
			panes		   = slider_wrapper.find('li'),
			pane_count     = panes.length,
			pane_width	   = $(panes.get(0)).find('img').width();
		
		return this.each(function() {
			init = function(el) {
				var id = [],
					trackID = 0,
					xPos;
					
				//	set slider window aka "ul" to it's appropriate width 
				$(el).find('ul').css('width', (pane_width * pane_count)+'px');
				//get slide pane id's and set them to the array 'id'
				for(var i = 0; i < pane_count; i++) {
					id[i] = $(panes.get(i)).attr('id');	
				}
				var advance = setInterval(function() {
					xPos = $(('#'+id[trackID])).position().left;
					if(trackID < (pane_count - 1)) {
						//advance
						//console.log(id[trackID]);
						
						//log(xPos);
						/*
						$('#slider-wrapper').animate({
							scrollLeft: xPos	
						}, 1000);	
						*/
						scrollAnimate('#slider-wrapper', xPos, settings.speed);
						
						log(id[trackID]);	
						trackID++;	
					} else {
						//start over
						//console.log(id[trackID]);	
						scrollAnimate('#slider-wrapper', xPos, settings.speed);
						trackID = 0;
					}
					settings.callback;	
				}, settings.pause);
			}	
			panes.each(function() {
				
			});
			var scrollAnimate = function(el, xPos, pause){
				$(el).animate({
					scrollLeft: xPos
				}, pause);	
			}	
			init(this);		
		});

	}	
})(jQuery);

$(document).ready(function() {
	log = function(msg) {
		console.log("\nDEBUGER SAYS:: " + msg);	
	}
	
	var $slider = $('#slider-wrapper'),
		slider_width = $slider.width(),
		panes = $slider.find('ul li'),
		pane_count = panes.length;
	
	//console.log(slider_width);
	
	//	set appropriate image sizes function
	setImages = function(el) {
		var $el = $(el),
			panes = $el.find('li'),
			pane_count = panes.length;
			
		getSize = function(string) {
			if($el.width() <= 480) {
				return string.replace(/(\..*)/, "@mobile$1");		
			} else {
				return string;
			}
		}
			
		var i = 0;
		panes.each(function() {
			var pane = panes.get(i),
				pane = $(pane),
				img_src = pane.find('noscript').attr('data-img'),					
				src = getSize(img_src);	
			log(src);
			$(this).append('<img src="'+src+'">');
			i++;	
		});	
	}
	//	slider function
	scrollSlider = function(el) {
		var $el = $(el),
			panes = $el.find('li'),
			pane_width = $(panes.get(0)).find('img').width();
			
		//set the width of the pane wrapper aka "ul"
		$el.find('ul').css('width', (pane_width * panes.length)+'px');
		
		
		/*
		log(panes.get(1));
		log(pane_width);	
		*/
	}	
	
	setImages($slider);
	//scrollSlider($slider);
	$slider.scrollSlider();
});
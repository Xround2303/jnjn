$(document).ready(function(){
	$(".sdr-categories").owlCarousel({
		items: 5,
		margin: 10,
		lazyLoad: true,
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
    	navText : ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
    	nav: true,
		responsive: {
			320 : {
				items: 1,
			},
			400 : {
				items: 2,	
			},
			576 : {
				items: 2,	
			},
			768 : {
				items: 3,	
			},
			991 : {
				items: 4,	
			},
			1200 :{
				items: 5,
			}
		}
	});

	

	
	


});



App = {

	// Header
	headerTopMenuToogle: function()
	{
		// document.addEventListener("scroll", function(){
		// 	if(window.pageYOffset >= 300)
		// 	{
		// 		if(window.pageYOffset >= 00)
		// 		{
		// 			$($("header .row")[0]).slideUp(50)
		// 		}
		// 	}
		// 	else
		// 	{
		// 		$($("header .row")[0]).slideDown(50)
		// 	}
		// })
	},

	// initialization
	init: function()
	{
		this.headerTopMenuToogle();
	}

}


document.addEventListener("DOMContentLoaded", function(){
	App.init();
})
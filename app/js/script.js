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

	$(".detail-list-photo").owlCarousel({
		items: 5,
		margin: 10,
		lazyLoad: true,
		// loop: true,

    	navText : ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
    	nav: true,
		responsive: {
			320 : {
				items: 1,
				touchDrag: false,
			},
			400 : {
				items: 2,	
				touchDrag: false,
			},
			576 : {
				items: 2,
				touchDrag: false,	
			},
			768 : {
				items: 3,
				touchDrag: false,	
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

	// HEADER
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
	// HEADER END 


	// DETAIL
	detailSelectBigPhoto: function()
	{
		$(".detail-list-photo").on("click", ".item", function(e){

		    $(".big-photo img")[0].src = $(this).find("img")[0].src;
		    return false;
		})

	},
	// DETAIL END


	// initialization
	init: function()
	{
		// HEADER
		this.headerTopMenuToogle();

		// DETAIL
		this.detailSelectBigPhoto();

	}

}


document.addEventListener("DOMContentLoaded", function(){
	App.init();
})
$(document).ready(function(){
	$(".sdr-categories").owlCarousel({
		items: 5,
		margin: 10,
		lazyLoad: true,
		loop: true,
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
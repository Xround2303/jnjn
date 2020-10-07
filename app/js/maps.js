var test;
document.addEventListener("DOMContentLoaded", function(){
	/*ymaps.ready(function () {  
		var map = new ymaps.Map("map", {
		  center: [55.76, 37.64], 
		  zoom: 10
		});
	});*/

	/*jQuery('.scrollbar-inner').scrollbar({
		"showArrows": true,
		"scrolly": "advanced"
	});*/

	OverlayScrollbars($('.scrollbar-inner'), {}); 

	document.querySelector(".map-filter .filter-head").addEventListener("click", function(e){
		e.preventDefault();
		let parent = e.target.closest(".filter");
		parent.classList.toggle("active");
		return false;
	});

})





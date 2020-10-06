
document.addEventListener("DOMContentLoaded", function(){
	/*ymaps.ready(function () {  
		var map = new ymaps.Map("map", {
		  center: [55.76, 37.64], 
		  zoom: 10
		});
	});*/

	$('.scrollbar-inner').scrollbar({ autoScrollSize: false });

	document.querySelector(".map-filter .filter-head").addEventListener("click", function(e){
		e.preventDefault();
		let parent = e.target.closest(".filter");
		parent.classList.toggle("active");
		// parent.querySelector(".filter-cnt").addEventListener("transitionend", )
		return false;
	});


})





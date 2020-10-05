
document.addEventListener("DOMContentLoaded", function(){
	/*ymaps.ready(function () {  
		var map = new ymaps.Map("map", {
		  center: [55.76, 37.64], 
		  zoom: 10
		});
	});*/

	$('.scrollbar-inner').scrollbar({
        "showArrows": true,
        "scrolly": "advanced"
    });

	document.querySelector(".filter-head").addEventListener("click", function(e){
		e.preventDefault();
		document.querySelector(".filter").classList.toggle("active");
	});


})





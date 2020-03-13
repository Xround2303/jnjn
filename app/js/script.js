$(document).ready(function(){
	
});



App = {


	// DETAIL
	detailSetBitPhoto: function()
	{
	    $(".big-photo img")[0].src = $(this).find("img")[0].src;
	    return false;
	},
	// DETAIL END



	// FAVORITE
	setFavorite: function()
	{
		$(this).toggleClass("active")
	},
	// FAVORITE END


	// PHOTO	
	photo: {
		add: function(e)
		{
			let reader = new FileReader();
			// console.log(e.target);
			
			reader.onload = function (e) {

				
				let container = document.createElement("li");
				let a = document.createElement("a")
				let i = document.createElement("i")
				let img = document.createElement("img")

				$(container).addClass("item");

				$(i).addClass("fas fa-times");

				a.href = "javascript:void(0)";
				$(a).addClass("tag delete");
				a.append(i);

				img.src = e.target.result;
				img.alt = "";

				container.append(a)
				container.append(img);
				
				$(".files-add-list .list-row").append(container)	
			}

			reader.readAsDataURL(e.target.files[0]);
		},
		delete: function()
		{
			$(this).parent().remove();
		}
	},
	// PHOTO END



	// ELEMETNS INPUTS
	inputRangeChange: function()
	{
									
		let min = $( ".input-range .input-in-out .min").val() * 1;
		let max = $( ".input-range .input-in-out .max").val() * 1;

		if( min > max )
		{
			min = max;
			$( ".input-range .input-in-out .min").val(min);
		}

		if( min < 0 )
		{
			min = 0;
			$( ".input-range .input-in-out .min").val(min);
		}

		if( max < min )
		{
			max = min;
			$( ".input-range .input-in-out .max").val(max);
		}

      	$( ".input-range .slider" ).slider( {"values": [min, max]} );
	},
	// ELEMETNS INPUTS


	// CARD PRODUCT
	cardGalleryPreview: function(e)
	{

		if(typeof imgCollection != "undefined")
		{
			container = $(e.target).parents(".preview")[0];
			nav = $(e.target).parents(".adv-item").find(".nav-preview .item");

			id = $(e.target).parents(".adv-item").attr("data-product-id");
			collection = imgCollection;



			if(container && collection[id])
			{

				step = container.scrollWidth / Object.keys(collection[id]).length;
				posMouse = e.originalEvent.offsetX;
				index = Math.floor(posMouse / step);

				if(index != Object.keys(collection[id]).length && index >= 0)
				{
					nav.removeClass("active");
					$(nav[index]).addClass("active");


					if(collection[id][index])
					{
						e.target.src = collection[id][index];	
					}	
				}

				
			}
		}
		
	},
	// CARD PRODUCT END


	initEventHandler: function()
	{
		$(".favorite").on('click', this.setFavorite);

		$(".detail-list-photo").on("click", ".item", this.detailSetBitPhoto);

		$(".input-range .min, .input-range .max").on('change', this.inputRangeChange);

		$(".files-add-list .item").on('click', '.delete', this.photo.delete);

		$(".files-add-list").on('click', '.item .delete', this.photo.delete);

		$(".files-add-list input[type=file]").on('change', this.photo.add);

		$(".adv-item .preview").on("mousemove", this.cardGalleryPreview)
	},


	init: function()
	{
		this.initEventHandler();

	}

}


document.addEventListener("DOMContentLoaded", function(){

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

	$(".filter_menu_r .list-cat").owlCarousel({
		items: 4,
		margin: 10,
		lazyLoad: true,
		mouseDrag: false,
		touchDrag: false,
    	navText : ['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],
    	nav: true,
    	stagePadding: 3,
		responsive: {
			320 : {
				items: 1,
				stagePadding: 0,
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
		}
	});

	App.init();
})
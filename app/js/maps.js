JNFilter = {

	options: {},

	init: function()
	{
		"use strict";
		this.event();
		this.filter.init();
		this.loader.init();
		this.map.init();
		this.libs.init();

	},

	event: function(){},

};

JNFilter.loader = {

	container: "",

	init: function()
	{
		this.container = document.querySelector("#jnjnmap .loader");
		this.event();
		return this;
	},

	show: function()
	{
		this.container.style.display = "flex";
		this.container.classList.add("active")		
	},

	hide: function()
	{		
		this.container.classList.remove("active")
	},

	event: function()
	{
		this.container.addEventListener("transitionend", function(e){
			if(!this.classList.contains("active"))
			{
				this.style.display = "none";
			}
		});
	}
};

JNFilter.map = {
	init: function()
	{
		/*ymaps.ready(function () {  
			var map = new ymaps.Map("map", {
			  center: [55.76, 37.64], 
			  zoom: 10
			});
		});*/
	}
};

JNFilter.filter = {
	
	elements: {},
	options: {},

	init: function()
	{
		this.elements.container = document.querySelector(".map-filter");
		this.elements.container.querySelectorAll("input, select");


		this.event();
	},

	open: function()
	{
		this.elements.container.classList.add("active");
	},

	hide: function()
	{
		this.elements.container.classList.remove("active");
	},

	isOpen: function()
	{
		return this.elements.container
			.classList.contains("active");
	},

	event: function()
	{
		let _self = this;
		this.elements.container.querySelector(".filter-head")
		.addEventListener("click", function(e){
			e.preventDefault();
			if(_self.isOpen())
			{
				_self.hide();	
			}
			else
			{
				_self.open();
			}
			return false;
		});
	}
};

JNFilter.libs = {
	init: function()
	{
		if(OverlayScrollbars)
		{
			OverlayScrollbars(document.querySelectorAll('.scrollbar-inner'), {});	
		}
		
	}
};

document.addEventListener("DOMContentLoaded", function(){
	JNFilter.init();
});



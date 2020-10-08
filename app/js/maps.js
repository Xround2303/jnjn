JNFilter = {

	options: {},

	init: function()
	{
		"use strict";
		this.event();
		this.filter.init();
		this.loader.init();
		this.libs.init();

	},

	event: function(){
		let _self = this;
		ymaps.ready(function(){
			_self.map.init();
		});
	},

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
		this.container.classList.remove("active");
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

	collection: {},

	init: function()
	{
		this.map = new ymaps.Map("map", {
			center: [55.76, 37.64],
			zoom: 10,
			controls: []
		});
		this.objectManager = new ymaps.ObjectManager({
			clusterize: true,
			geoObjectOpenBalloonOnClick: true,
			clusterOpenBalloonOnClick: true
		});
		this.map.geoObjects.add(this.objectManager);

		this.map.events.add(['boundschange','datachange','objecttypeschange'], function(e){

			JNFilter.filter.formSave();
			return false;

			let dataObject = [];
			objectManager.objects.each(function (object) {

				let objectState = objectManager.getObjectState(object.id);
				let bounds = map.getBounds();
				let contains = ymaps.util.bounds.containsPoint(bounds, object.geometry.coordinates);

				if (objectState.isShown && contains) {
					dataObject.push(object.id);
				}

			});
			console.log("Точки в зоне видимости:", dataObject);
		});

	},

	pointRender: function(data) {
		this.collection = data;
		this.objectManager.objects.removeAll();
		this.objectManager.add(this.collection);
	},




};

JNFilter.filter = {
	
	elements: {},
	options: {
		delaySendFormData: 0,
	},

	init: function()
	{
		this.elements.container = document.querySelector(".map-filter");
		this.elements.form = this.elements.container.querySelector("form");
		this.elements.inputs = this.elements.container.querySelectorAll("input, select");

		this.event();
	},

	formSave: function(target)
	{

		let _self = this;
		let data = new FormData(this.elements.form);

		if(this.options.timeoutFilterFormSend)
		{
			clearTimeout((this.options.timeoutFilterFormSend));
		}

		this.options.timeoutFilterFormSend = setTimeout(
			function () {
				_self.formSend(data);
			},
			this.options.delaySendFormData
		);
	},

	formSend: function(data)
	{
		let _self = this;
		// JNFilter.loader.show();
		$.ajax({
			url: "/data/point.json"
		}).done(function(data) {
			setTimeout(function () {
				JNFilter.map.pointRender(data);
				// JNFilter.loader.hide();
			}, 200)
		});
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

		for(let input of this.elements.inputs)
			input.addEventListener("change", this.formSave.bind(this));

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



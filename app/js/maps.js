JNFilter = {

	options: {
		blockScroll: false
	},
	scrollBars: {},

	init: function()
	{
		"use strict";

		this.filter.init();
		this.items.init();
		this.loader.init();
		this.libs.init();
		this.map.init();

		this.event();

	},

	event: function(){
		let _self = this;
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
	objectView: [],

	init: function()
	{
		let _self = this;
		ymaps.ready(function(){

			_self.map = new ymaps.Map("map", {
				center: [55.76, 37.64],
				zoom: 10,
				controls: []
			});
			_self.objectManager = new ymaps.ObjectManager({
				clusterize: true,
				geoObjectOpenBalloonOnClick: false,
				clusterOpenBalloonOnClick: false,
				clusterDisableClickZoom: true,
			});
			_self.map.geoObjects.add(_self.objectManager);
			_self.event();

			JNFilter.filter.formSave();

		});
	},

	getViewCord: function()
	{
		let coordinates = this.map.getBounds();
		JNFilter.filter.options.coordinates.x1 =  coordinates[0][0];
		JNFilter.filter.options.coordinates.y1 =  coordinates[0][1];
		JNFilter.filter.options.coordinates.x2 =  coordinates[1][0];
		JNFilter.filter.options.coordinates.y2 =  coordinates[1][1];
	},

	setCollection: function(data)
	{
		this.collection = data;
	},

	pointDraw: function()
	{
		this.objectManager.objects.removeAll();
		this.objectManager.add(this.collection);
	},

	pointRender: function(data)
	{
		this.setCollection(data);
		this.pointDraw();
		JNFilter.items.renderList(this.collection.features);
	},

	getPoint: function(itemID)
	{
		if(typeof itemID == "undefined") return false;

		for(let item of this.collection.features)
			if(item.id === itemID) return item;

	},

	event: function()
	{
		let _self = this;
		this.map.events.add(['boundschange','datachange','objecttypeschange'], function(e){
			JNFilter.filter.formSave();
			JNFilter.filter.hide();
		});

		this.objectManager.events.add('click', function(e){

			let objectID = e.get('objectId');
			let cluster = _self.objectManager.clusters.getById(objectID);
			let items;

			if(!cluster)
			{
				items = [_self.getPoint(objectID)];
			}
			else
			{
				items = _self.objectManager.clusters.getById(objectID).properties.geoObjects;
			}

			JNFilter.filter.hide();
			JNFilter.items.renderList(items);
		});
	},

};

JNFilter.items = {

	elements: {
		content: document.querySelector(".filter.map-items .cnt")
	},
	options: {},
	pagination: {
		limit: 6,
		end: 0,
	},

	items: [],
	template: "",

	init: function() {
		this.getTemplate();
	},

	getTemplate: function()
	{
		let _self = this;
		$.ajax({
			url: "/src/elements/fl-item.html",
			type: "GET",
			success: function (data) {
				_self.template = data;
			}
		})
	},

	itemEmptyShow: function()
	{
		// document.querySelector(".item-empty")
	},

	itemEmptyHide: function()
	{
		// document.querySelector(".item-empty")
	},

	clear: function()
	{
		JNFilter.options.blockScroll = false;
		JNFilter.scrollBars.items.scroll({y: 0});
		this.pagination.end = 0;
		this.elements.content.innerHTML = "";
	},

	renderList: function(items, method)
	{
		this.items = items;
		this.clear();
		this.uploading(method);
	},

	render: function (items, method)
	{
		if(!method) method = "";

		let arTemplateItems = [];

		for(let item of items)
		{

			let id = item.id;
			let template = this.template;

			template = template.replace("#ID#", id);
			template = template.replace("#NAME#", id);
			template = template.replace("#DETAIL_URL#", "/detail.html");
			template = template.replace("#IMAGE#", `/img/detail-${Math.round(1 + Math.random() * (6 - 1))}.jpg`);
			template = template.replace("#PRICE#", Math.round(100000 + Math.random() * (9000000 - 100000)));

			arTemplateItems.push(template);

		}

		this.draw(arTemplateItems, method);

	},

	draw: function(templates, method)
	{
		if(method !== "append")
			this.clear();

		for(let template of templates)
		{
			this.elements.content.insertAdjacentHTML("beforeend", template)
		}
	},

	uploading: function(method)
	{
		let counter = 0;
		let groupItems = [];


		if(this.pagination.end + 1 >= this.items.length && this.items.length !== 1)
		{
			return false;
		}

		for(let i = this.pagination.end; i < this.items.length; i++)
		{

			if(counter >= this.pagination.limit)
			{
				break;
			}


			groupItems.push(this.items[i]);
			this.pagination.end = i;
			counter++;
		}

		this.pagination.end ++;

		this.render(groupItems, method);
		return true;
	},

	event: function(){}
};

JNFilter.filter = {
	
	elements: {},
	options: {
		delaySendFormData: 0,
		coordinates: {
			x1: 0,
			x2: 0,
			y1: 0,
			y2: 0
		}
	},

	init: function()
	{
		this.elements.container = document.querySelector(".map-filter");
		this.elements.form = this.elements.container.querySelector("form");
		this.elements.inputs = this.elements.container.querySelectorAll("input, select");

		this.event();
	},

	formSave: function()
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
		JNFilter.loader.show();
		JNFilter.map.getViewCord();
		$.ajax({
			url: "/data/point.json"
		}).done(function(data) {
			setTimeout(function () {
				JNFilter.map.pointRender(data);
				JNFilter.loader.hide();
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
			JNFilter.scrollBars.items = OverlayScrollbars(document.querySelector('.map-items .scrollbar-inner'), {
				"callbacks": {
					"onScroll": function(e)
					{
						if(e.target.scrollTop <= 0)
						{
							return false;
						}
						if(e.target.scrollTop + e.target.clientHeight + 50 >=  e.target.scrollHeight)
						{
							if(JNFilter.options.blockScroll) return false;
							JNFilter.options.blockScroll = true;
							if(JNFilter.items.uploading("append"))
								JNFilter.options.blockScroll = false;
						}
					}
				}
			});
			JNFilter.scrollBars.filter = OverlayScrollbars(document.querySelector('.map-filter .scrollbar-inner'), {})
		}
		
	}
};

document.addEventListener("DOMContentLoaded", function(){
	JNFilter.init();
});



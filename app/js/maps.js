JNFilter = {

	options: {},

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
				geoObjectOpenBalloonOnClick: true,
				clusterOpenBalloonOnClick: true
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
		});

		this.objectManager.events.add('click', function(e){
			let item = _self.getPoint(e.get('objectId'));
			JNFilter.items.render([item]);
		});
	},

};

JNFilter.items = {

	elements: {},
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

	renderList: function(items)
	{
		this.items = items;
		this.uploading();
	},

	render: function (items)
	{

		let arTemplateItems = [];

		for(let item of items)
		{

			let id = item;
			let template = this.template;

			template = template.replace("#ID#", id);
			template = template.replace("#NAME#", "2-х комнатная квартира");
			template = template.replace("#DETAIL_URL#", "/detail.html");
			template = template.replace("#IMAGE#", `/img/detail-${Math.round(1 + Math.random() * (6 - 1))}.jpg`);
			template = template.replace("#PRICE#", Math.round(100000 + Math.random() * (9000000 - 100000)));

			arTemplateItems.push(template);

		}

		this.draw(arTemplateItems, "append");

	},

	draw: function(templates, method)
	{
		if(method !== "append")
			document.querySelector(".filter-cnt .cnt").innerHTML = "";

		for(let template of templates)
		{
			document.querySelector(".filter-cnt .cnt").insertAdjacentHTML("afterbegin", template)
		}
	},

	uploading: function()
	{
		let counter = 0;
		let groupItems = [];

		if(this.pagination.end === this.items.length)
		{
			return false;
		}

		for(let i = this.pagination.end; i <= this.items.length; i++)
		{
			if(counter >= this.pagination.limit)
			{
				this.pagination.end = i++;
				break;
			}

			groupItems.push(this.items[i]);
			counter++;
		}

		this.render(groupItems);
	},

	event: function()
	{
		/*document.querySelector(".filter-cnt").addEventListener("scroll", function () {
			console.log("1");
		});*/
	}
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
		let checkScroll = false;
		if(OverlayScrollbars)
		{
			instance = OverlayScrollbars(document.querySelectorAll('.scrollbar-inner'), {
				"callbacks": {
					"onScroll": function(e)
					{
						/*console.log(e.target.scrollTop);
						console.log(e.target.clientHeight);
						console.log(e.target.scrollHeight);*/
						if(e.target.scrollTop + e.target.clientHeight + 20 >=  e.target.scrollHeight)
						{
							if(!checkScroll)
							{
								checkScroll = true;
								// JNFilter.items.uploading();
								console.log(instance.scroll({x:50}))
							}

						}

					}
				}
			});
		}
		
	}
};

document.addEventListener("DOMContentLoaded", function(){
	JNFilter.init();
});



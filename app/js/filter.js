(function($, window, document, undefined) {

	var Filter = {

	}

	Filter.containers = {

		modelsContainer: $(".list-model"),
		modelsTabs: $(".list-model .list-row"),
		modelsItemsContainer: $(".list-model section.items"),

	}


	Filter.registerEventHandlers = function()
	{

		this.containers.modelsTabs.on("click", ".item", function(){
			Filter.containers.modelsTabs.find(".item").removeClass("active")
			$(this).addClass("active")

			Filter.containers.modelsItemsContainer.slideToggle(0);
			
		})

	}


	Filter.init = function()
	{
		this.registerEventHandlers();
	}

	Filter.init();


})(window.jQuery, window, document);



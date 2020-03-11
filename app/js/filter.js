(function($, window, document, undefined) {

	var Filter = {

	}

	Filter.containers = {

		modelsContainer: $(".list-model"),
		modelsTabs: $(".list-model .list-row"),

	}


	Filter.registerEventHandlers = function()
	{
		this.containers.modelsTabs.on("click", ".item", function(){
			Filter.containers.modelsTabs.find(".item").removeClass("active")
			$(this).addClass("active")
		})
	}


	Filter.init = function()
	{
		this.registerEventHandlers();
	}

	Filter.init();


})(window.jQuery, window, document);



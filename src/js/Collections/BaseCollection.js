define(
	['backbone'],
	function (Backbone)
	{
		
		var BaseCollection = Backbone.Collection.extend({
			
			url : function()
			{	
				var url = (this.parenttype)?
			
					Application.Api + '/' + this.parenttype + "/" + this.parentmodel.id + "/" + this.collectiontype :
					Application.Api + '/' + this.collectiontype;
			
				return this.parameters? url + "?" + $.param (this.parameters): url;
			},
			
			parse : function (response)
			{					
				return response;
			},
			
			sync : function (method, model, options)
			{
				return Backbone.sync(method, model, options);
			}
		});

		return BaseCollection;
	}
);
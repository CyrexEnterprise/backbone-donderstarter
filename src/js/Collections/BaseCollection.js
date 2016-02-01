define(
	['backbone'],
	function (Backbone)
	{
		
		var BaseCollection = Backbone.Collection.extend({

			url: function() {

				var endpoint = '/'+ this.endpoint;

				return (this.parentModel? this.parentModel.url() + endpoint: endpoint);
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
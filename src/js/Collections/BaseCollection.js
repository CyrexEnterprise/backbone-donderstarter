define(
	['backbone'],
	function (Backbone)
	{

		var BaseCollection = Backbone.Collection.extend({

			initialize: function(options) {

				$.extend(this, options);

			},

			url: function() {

				var url = Application.Api;

				if (this.parentModel)
					url = url + this.parentModel.modelType + '/' + this.parentModel.id + '/';

				return url + this.collectionType + (this.parameters? '?'+$.param(this.parameters): '');
			},

			parse : function (response)
			{
				return response.data;
			},

			sync : function (method, model, options)
			{

				this.endpoint = (options.endpoint)? options.endpoint: '';
				this.parameters = (options.parameters)? options.parameters: '';

				//console.log(this.parameters);
				return Backbone.sync(method, model, options);
			}
		});

		return BaseCollection;
	}
);

define(
	['backbone'],
	function (Backbone)
	{		
		var BaseModel = Backbone.Model.extend({

			initialize: function(options) {

			},

			url: function() {

				var url = (this.parenttype)?
			
					Application.Api + '/' + this.parenttype + "/" + this.parentmodel.id + "/" + this.collectiontype :
					Application.Api + '/' + this.collectiontype;
			
				return this.parameters? url + "?" + $.param (this.parameters): url;
			}
		});

		return BaseModel;
	}
);
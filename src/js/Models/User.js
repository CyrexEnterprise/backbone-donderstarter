
define(
	['Models/BaseModel'],
	function (BaseModel)
	{
		var User = BaseModel.extend({

			initialize: function(options) {

				this.once('change', this.activate);			
			},

			url: function() {

				return Application.Api + '/me';
			},

			activate: function() {
				this.trigger('activated');
			}
		});

		return User;
	}
);
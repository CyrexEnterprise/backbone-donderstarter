
define(
	['Models/BaseModel'],
	function (BaseModel)
	{
		var Account = BaseModel.extend({

			urlRoot: '/accounts',
			
			initialize: function(options) {

			}
		});

		return Account;
	}
);
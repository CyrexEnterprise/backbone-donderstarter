
define(
	['Models/BaseModel'],
	function (BaseModel)
	{
		var Account = BaseModel.extend({

			modelType: 'accounts',

			initialize: function(options) {

			}
		});

		return Account;
	}
);

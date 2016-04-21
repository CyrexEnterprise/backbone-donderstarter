define(
	['Models/BaseModel', 'Models/Account'],
	function (BaseModel, Account)
	{
		var User = BaseModel.extend({

			modelType: 'users',

			initialize: function(options) {
				$.extend(this, options);
			},

			getCurrentAccount: function() {

				var accountId = this.get('currentAccount'),
					accounts = this.get('accounts');

				return this.accounts.get(accountId);
			},

			setCurrentAccount: function(id) {

				this.set('currentAccount', id);
				this.account = new Account(this.getCurrentAccount().attributes);
			},
		});

		return User;
	}
);

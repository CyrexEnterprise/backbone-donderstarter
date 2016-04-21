
define(
	['Models/User', 'Collections/Accounts', 'Models/Account'],
	function (User, Accounts, Account)
	{
		var Me = User.extend({

			modelType: 'me',

			initialize: function(options) {
				this.once('change', this.activate);
			},

			activate: function() {

				if (!this.get('currentAccount'))
					this.set('currentAccount', this.get('accounts')[0].id);

				this.accounts = new Accounts(this.get('accounts'));
				this.account = new Account(this.getCurrentAccount().attributes);

				this.trigger('activated');
			}
		});

		return Me;
	}
);

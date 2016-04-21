
define(
	['Models/Me'],
	function (Me)
	{
		var Session = {

			version : 1,

			loadEssentialData : function (callback)
			{
				this.user = new Me();

				this.user.once("activated", function () {
					callback();
				}.bind(this));

				this.user.fetch({error: this.authError.bind(this)});
			},
			// Error on API, for example
			authError: function() {
				this.logout();
			},

			logout: function() {

				this.authenticationtoken = null;
				Backbone.accesstoken = null;
				localStorage.removeItem('token');

				var r = /[^\/]*$/;
				var path = window.location.href.replace(r, '');
				window.location = path;
			},
			getAccount: function() {

				return this.user.account;
			}
		};


		return Session;
	}
);

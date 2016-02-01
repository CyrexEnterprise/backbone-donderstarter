
define(
	['Models/User'],
	function (User)
	{
		var Session = {
			
			version : 1,

			loadEssentialData : function (callback)
			{	
				this.User = new User();

				this.User.once("activated", function () {	
					callback();
				}.bind(this));
				
				this.User.fetch({error: this.authError.bind(this)});
			},

			// Error on API, for example
			authError: function() {
				this.logout();
			},

			logout: function() {

				this.authenticationtoken = null;
				localStorage.removeItem('token');

				var r = /[^\/]*$/;
				var path = window.location.href.replace(r, '');
				window.location = path;
			}
		};


		return Session;
	}
);

define(
	['Router', 'config', 'Models/User', 'Views/RootView', 'Session'],
	function (Router, config, User, RootView, Session)
	{
		var Application = {
			
			version : 1,
			authentication: false,

			init : function ()
			{
				// Load configs
				Application.Api = config.apiurl;
				Application.Session = Session;

				if (this.authentication) {
					this.authenticate();
					this.loadUserData();
				}
				else
					this.justStart();

				return this;
			},

			// Oauth2 Authentication
			authenticate: function() {

				var token = window.localStorage.getItem('token');

				//Check if there is authentication
				if(token && token.length > 9)
				{	
					Application.Session.authenticationtoken = token;
					Backbone.accesstoken = token;

				} else{ console.log("token error", token); window.location = window.location.pathname+"login.html";}
			},

			// Get User data after authentication;
			// Inits the backbone views & router
			loadUserData: function() {

				this.Session.loadEssentialData (function ()	{
					
					$('body').addClass('loaded').removeClass('loading');

					// Root view
					Application.RootView = new RootView();				
					Application.RootView.renderNav();

					var name = Application.Session.User.attributes.user.name,
						firstname = Application.Session.User.attributes.user.firstname;

					if (name)		localStorage.setItem('name', name);
					if (firstname)	localStorage.setItem('firstname', firstname);

					// Router
					Application.Router = new Router ();

					Backbone.history.start();
				});
			},

			// Override the user login & authentication
			justStart: function() {

				$('body').addClass('loaded').removeClass('loading');

				// Root view
				Application.RootView = new RootView();				
				Application.RootView.renderNav();

				// Router
				Application.Router = new Router ();

				Backbone.history.start();
			}
		};

		Backbone.ajax = function() {  
		    arguments[0].headers = {
		        'Authorization': Application.Session.authenticationtoken,
		    };

		    return Backbone.$.ajax.apply(Backbone.$, arguments);      
		};

		return Application;
	}
);
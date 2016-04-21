
define(
	['Router', 'config', 'Models/User', 'Views/RootView', 'Session'],
	function (Router, config, User, RootView, Session)
	{
		var Application = {

			version : 1,
			authentication: true,
			userdata: true,

			init : function ()
			{
				// Load configs
				Application.Api = config.apiurl;
				Application.Session = Session;

				if (this.authentication)
					this.authenticate();
				else
					this.isAuthenticated = true;

				if (this.userdata && this.isAuthenticated)
					this.loadUserData();

				//else
				//	this.begin();

				return this;
			},

			// Oauth2 Authentication
			authenticate: function() {

				var token = window.localStorage.getItem('token');

				// Check if there is authentication
				if(token && token.length)
				{
					Application.Session.authenticationtoken = token;
					Backbone.accesstoken = token;
					this.isAuthenticated = true;

				} else{
					console.log("token error", token);
					this.isAuthenticated = false;
					window.location = window.location.pathname+"login.html";}
			},

			// Get User data after authentication;
			// Inits the backbone views & router
			loadUserData: function() {

				this.Session.loadEssentialData (function ()	{
					this.begin();
				}.bind(this));
			},

			// Callbak function after user authentication
			begin: function() {

				$('body').addClass('loaded').removeClass('loading');

				// Root view
				Application.RootView = new RootView();
				Application.RootView.renderNav();

				// Init roles
				Application.RootView.initRoles();

				// Router
				Application.Router = new Router ();

				Backbone.history.start();
			}
		};

		Backbone.ajax = function() {
		    arguments[0].headers = {
		        //'Authorization': Application.Session.authenticationtoken,
		        'Authorization': 'Bearer '+ Application.Session.authenticationtoken
		    };

		    return Backbone.$.ajax.apply(Backbone.$, arguments);
		};
		return Application;
	}
);

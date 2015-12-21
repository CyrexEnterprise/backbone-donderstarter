
define(
	['Views/Dashboard'],
	function (DashboardView)
	{
		var Router = Backbone.Router.extend({
			
			routes: {

				'logout': 'logout',

		        'home': 'home',
		        '*path': 'home'
		    },

		    home: function(){
		    	var view = new DashboardView();
		    	Application.RootView.setView(view);
		    },

		    logout: function() {

		    	Application.Session.logout();
		    }
		});

		return Router;
	}
);
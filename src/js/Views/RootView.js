
define(
	['Views/BaseView', 'backbone_auth'],
	function (BaseView, Roles)
	{
		var RootView = BaseView.extend({

		    render : function ()
			{	
				if (typeof (this.view) === 'undefined')
					return;
				
				$('#main-content').html (this.view.render().el);

				// Scroll to top
				window.scrollTo(0, 0);	
			},

			setView : function (view)
			{
				this.view = view;
				this.render ();

				this.view.trigger('view:rendered');
			},

			renderNav: function() {

				$('header').html(Mustache.render(Templates.topnav, {}));
			},

			initRoles: function () {

				var userRoles = Application.Session.User? Application.Session.User.get('roles'): null;

				if (userRoles) {

					var roles = new Roles();
					roles.set(userRoles)
				}
			}
		});

		return RootView;
	}
);
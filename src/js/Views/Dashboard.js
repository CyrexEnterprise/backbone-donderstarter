
define(
	['Views/BaseView'],
	function (BaseView)
	{
		var Dashboard = BaseView.extend({

			events: {},	

			initialize: function(options) {

			},	

		    render: function()
		    {	
		    	this.$el.html(Mustache.render(Templates.dashboard, {}));

		        return this;
		    }
		});

		return Dashboard;
	}
);
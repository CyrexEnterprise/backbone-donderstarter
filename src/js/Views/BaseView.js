define (
	[
		'underscore',
		'backbone',
		'mustache'
	],
	function (_, Backbone, mustache)
	{
		// Sets Mustache api available in all views
		Mustache = mustache;

		var BaseView = Backbone.View.extend ({

		});

		return BaseView;
	}
);
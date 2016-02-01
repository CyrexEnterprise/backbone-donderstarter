var pathname = window.location.pathname;

require.config({

	baseUrl : pathname+'js',
	shim: {
  	bootstrap: {
    		deps: [
      		'jquery'
    		],
    		exports: 'bootstrap'
  	}
	},

	paths: {
    jquery: pathname+'vendor/jquery/dist/jquery.min',
    backbone: pathname+'vendor/backbone/backbone-min',
    requirejs: pathname+'vendor/requirejs/require',
    underscore: pathname+'vendor/underscore/underscore-min',
    mustache: pathname+'vendor/mustache.js/mustache',
    bootstrap: pathname+'vendor/bootstrap/dist/js/bootstrap.min',
    backbone_auth: pathname+'vendor/backbone-auth/index'
	},
	
	urlArgs: "bust=" +  (new Date()).getTime()
});

var Application;

require(
  ['backbone', 'application', 'bootstrap'],
  function(Backbone, application, Bootstrap)
  {
    $(document).ready(function()
    {     

      Application = application;
      Application.init();
    });
  }
);

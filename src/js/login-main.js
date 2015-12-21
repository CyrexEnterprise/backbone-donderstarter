var pathname = window.location.pathname;

/**
 * Require dependencies
 */
require.config({baseUrl : 'js',});

require(
	['vendor/jquery/dist/jquery.min.js', 'config'],
	function($, config)
	{
		config.hasToken();
	}
);

/**
 * Origin function
 */
var origin = function ()
{
	return (window.location.origin)? window.location.origin : window.location.protocol + "//" + window.location.hostname;
};

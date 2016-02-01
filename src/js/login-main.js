var pathname = window.location.pathname;

/**
 * Require dependencies
 */
require.config(
{
	baseUrl: '/js/',
	paths: 
	{
		jquery: '../vendor/jquery/dist/jquery.min'
	},
	
});

require(
	['jquery', 'Utilities/Authorize'],
	function($, auth)
	{
		auth.hasToken();
	}
);
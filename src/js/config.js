define({

	appid : "oauth000000000000",
	apiurl: "https://api.cloudoki.com",
	authurl: "https://api.cloudoki.com/oauth2/",

	setloginwindow : function ()
	{
		$("iframe").get(0).src = this.authurl + "authorize?response_type=token&state=xyz&client_id=" + this.appid + "&redirect_uri=" + path() + "auth.html";
	},
	
	hello : function ()
	{
		window.location = path();
	},
	
	hasToken : function ()
	{
		// Authentication
		var token = window.localStorage.getItem('token');

		if(token && token.length > 9) this.hello();
		else	
		{
			if(token) {
				window.localStorage.removeItem('token');
				window.localStorage.removeItem('name');
				window.localStorage.removeItem('firstname');
			}
			
			this.setloginwindow();
			window.addEventListener("message", this.receiveToken.bind(this), false);	
		}
	},
	
	receiveToken :function (event)
	{
		if (event.origin !== origin())
		return;
		
		if (event.data && event.data.length > 9)
		{
			window.localStorage.setItem('token', event.data);
			this.hello();
		}
		else this.setloginwindow();
	}
});

var origin = function ()
{
	return (window.location.origin)? window.location.origin : window.location.protocol + "//" + window.location.hostname;
};

var path = function () {
	
	var r = /[^\/]*$/;

	return window.location.href.replace(r, '');
};
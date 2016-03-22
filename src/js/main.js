var xmlhttp = new XMLHttpRequest(),
    paths = "js/paths.json",
    pathname = window.location.pathname,
    Application;

// Requirejs configuration
function loadRequire(paths) {

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

    paths: paths,
    
    urlArgs: "bust=" +  (new Date()).getTime()
  });

  require(
    ['backbone', 'Application', 'bootstrap'],
    function(Backbone, application, Bootstrap)
    {
      $(document).ready(function()
      {     

        Application = application;
        Application.init();
      });
    }
  );
}

// Load configuration files
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        
        var paths = JSON.parse(xmlhttp.responseText);
        
        Object.keys(paths).map(function(k) {
          paths[k] = pathname+paths[k];
        });

        loadRequire(paths);
    }
};
xmlhttp.open("GET", paths, true);
xmlhttp.send();
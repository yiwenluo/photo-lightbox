var SearchClient = (function () {

    // Client ID for making request to Instgram API
    var CLIENT_ID = "2b77d4dd6ca24f22950d27fb9f95db1f";

    var JSONP_TIMEOUT = 2 * 1000; // 2s

    var successCB;
    var failCB;

    function fetchSearchResult(url) {

        function executeJsonp(url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        var timer = window.setTimeout(function(){
            window.PhotoLightBoxGotResultCallback = function(){};
            onGotResultFail();
        }, JSONP_TIMEOUT);

        window.PhotoLightBoxGotResultCallback = function (response) {
            window.clearTimeout(timer);
            onGotResults(response);
        };
        executeJsonp(url);        
    }

    function onGotResults(response) {
        if (response && response.meta && response.meta.code === 200) {
            successCB(response.data);
        }
        else {
            onGotResultFail();
        }
    }

    function onGotResultFail() {
        failCB && failCB();
    }
    
    function getSearchResult(term, successCallback, failCallback) {

        var url = "https://api.instagram.com/v1/tags/" + term 
                    + "/media/recent"
                    + "?client_id=" + CLIENT_ID
                    + "&callback=PhotoLightBoxGotResultCallback"; 
        
        successCB = successCallback;
        failCB = failCallback;
        fetchSearchResult(url);
    }

    return {
        getSearchResult: getSearchResult
    }
})();
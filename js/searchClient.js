/**
 * Search Client Module
 * 
 * A module that is responsible for making serach request to the network data source
 * to fetch the images that needs to be displayed
 */
var SearchClient = (function () {

    // Client ID for making request to Instgram API
    var CLIENT_ID = "2b77d4dd6ca24f22950d27fb9f95db1f";

    // JSONP request timeout
    var JSONP_TIMEOUT = 2 * 1000; // 2 seconds

    // Request success handler passed by caller
    var successCallback;
    // Request failure handler passed by caller
    var failCallback;

    /**
     * Fetch search result from network using JSONP
     * @param {String} URL to make the request to
     */
    function fetchSearchResult(url) {

        function executeJsonp(url) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        var timer = window.setTimeout(function(){
            // reset global callback
            window.PhotoLightBoxGotResultCallback = function(){};
            onGotResultFail();
        }, JSONP_TIMEOUT);

        window.PhotoLightBoxGotResultCallback = function (response) {
            window.clearTimeout(timer);
            onGotResults(response);
        };

        executeJsonp(url);        
    }

    /**
     * Success request handler for the network request
     * @param {Object} response
     */ 
    function onGotResults(response) {
        if (response && response.meta && response.meta.code === 200) {
            successCallback(response.data);
        }
        else {
            onGotResultFail();
        }
    }

    /**
     * Failed reqeuest handler for the network request
     */
    function onGotResultFail() {
        failCallback && failCallback();
    }

    /**
     * Construct URL for making the search request.
     * @param {String} term
     * @param {String} url to make the request to
     */
    function getUrl(term) {
        return "https://api.instagram.com/v1/tags/" + term 
                    + "/media/recent"
                    + "?client_id=" + CLIENT_ID
                    + "&callback=PhotoLightBoxGotResultCallback"; 
    }
    
    /**
     * Get search result from network using the given search term.
     * Calll success callback or failure callback when the request succeeded or failed
     * @param {String} search term
     * @param {Function} success callback
     * @param {Function} failure callback
     */
    function getSearchResult(term, successCB, failCB) {

        successCallback = successCB;
        failCallback = failCB;

        var url = getUrl(term);
        fetchSearchResult(url);
    }

    return {
        getSearchResult: getSearchResult
    }
})();
/**
 * Main function for this application
 */
(function () {
    
    /**
     * Call search module to perform the search action
     * @param {String} hashtag to search for
     */
    function search(hashTag) {
        SearchClient.getSearchResult(hashTag, onResultReceived, onRequestFailed);
    }
    
    /**
     * Search request success handler
     * @param {Array} an array of data to display
     */
    function onResultReceived(dataArray) {
        var images = InstagramDataAdapter.convert(dataArray);
        if (images.length > 0) {
            Lightbox.update(images);
            Lightbox.show();
        }
        else {
            SearchWidget.showError("No result found. Please try some other hashtags");
        }
        SearchWidget.clear();
    }

    /**
     * Search request failure handler. 
     * Display error message to indiates the error
     */ 
    function onRequestFailed(ev) {
        SearchWidget.showError("Search failed. Please try some other hashtags.")
    }

    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            // initialize application when DOM is ready
            SearchWidget.initialize(search);
            Lightbox.initialize();
        }
    }

})();
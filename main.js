(function () {
    
    function search(hashTag) {
        SearchClient.getSearchResult(hashTag, onResultReceived, onRequestFailed);
    }
    
    function onResultReceived(dataArray) {
        // if successful
        var images = InstagramDataAdapter.convert(dataArray);
        if (images.length > 0) {
            Lightbox.update(images);
            Lightbox.show();
        }
        else {
            // show error message
        }
        SearchWidget.clear();
        
    }

    function onRequestFailed(ev) {
        // show error message
    }

    function searchResultAdapter() {

    }

    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            // initialize application when DOM is ready

            SearchWidget.initialize(search);
            Lightbox.initialize();
        }
    }

})();
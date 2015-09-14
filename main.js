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
            SearchWidget.showError("No result found. Please try some other hashtags");
        }
        SearchWidget.clear();
        
    }

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
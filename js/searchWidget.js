var SearchWidget = (function () {
    
    var _searchWidget;
    var _searchInput;
    var _searchButton;

    var _callback;

    function initialize(onSearchClickedCallback) {
        _searchWidget = document.querySelector(".search-widget");
        _searchInput = _searchWidget.querySelector("input");
        _searchButton = _searchWidget.querySelector("button");
        _callback = onSearchClickedCallback;
        _searchButton.onclick = onSearchSubmit;
    }

    function clear() {
        _searchInput.value = "";
    }

    function onSearchSubmit() {
        
        function formatInput(str) {
            var regex = /[\s|#]*/g;
            var trimed = str.replace(regex, "");
            return trimed;
        }

        if (_callback) {
            var userInput = formatInput(_searchInput.value);
            _callback(userInput);
        }
        else {
            console.error("Search callback is not specified");
        }
    }


    return {
        initialize: initialize,
        clear: clear,
    }
})();
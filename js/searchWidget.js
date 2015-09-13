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

        _searchWidget.onkeydown = onKeyDown;
        _searchButton.onclick = onSearchSubmit;

        document.onkeydown = captureInput;
    }

    function clear() {
        _searchInput.value = "";
    }

    function captureInput(ev) {
        if (!_searchInput.value) {
            _searchInput.value = "#";
            _searchInput.focus();
        }
    }

    function onKeyDown(ev) {
        switch (ev.keyCode) {
            case 13: // enter
                onSearchSubmit();
                break;
            default:
                if (!_searchInput.value) {
                    _searchInput.value = "#";
                }
                break;
        }
        ev.stopImmediatePropagation();
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
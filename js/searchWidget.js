/**
 * Search Widget module
 * A singleton module that intialize the search widget on the page
 */
var SearchWidget = (function () {
    // search widget elements
    var _searchWidget;
    var _searchInput;
    var _searchButton;
    var _errorMessage;

    // callback for the search action
    var _callback;

    /**
     * Initialize the search widget using the given callback
     * Bind necessary event hanlder for the search widget to work
     * @param {Function} search button clicked callback
     */
    function initialize(onSearchClickedCallback) {
        _searchWidget = document.querySelector(".search-widget");
        _searchInput = _searchWidget.querySelector("input");
        _searchButton = _searchWidget.querySelector("button");
        _errorMessage = _searchWidget.querySelector(".error");

        _callback = onSearchClickedCallback;

        _searchWidget.onkeydown = onKeyDown;
        _searchButton.onclick = onSearchSubmit;

        captureInitialKeyboardInput();

        _errorMessage.addEventListener("animationend", function () {
            // remove animation class so that it doesn't play multiple times
            // NOTE: somehow animation-iteration-count doesn't work for me. Need more investigation
            _errorMessage.classList.remove("fade-out-anime");
            _errorMessage.style.display = "none";
        });
    }

    /** 
     * Clear the search input
     */ 
    function clear() {
        _searchInput.value = "";
    }

    /**
     * Capture initial user input when user starts typing, so that they don't need 
     * to click on the search input box then type.
     * This is only meant to be a UX improvement
     */
    function captureInitialKeyboardInput() {

        document.onkeydown = function () {
            // Check if the search input already has anything in it, 
            // if not, then set the focus to the input box and prepopulate a "#"
            // otherwise, skip
            if (!_searchInput.value) {
                _searchInput.value = "#";
                _searchInput.focus();
            }
        };
    }

    /**
     * Search input key down event handler
     */
    function onKeyDown(ev) {
        switch (ev.keyCode) {
            case 13: // enter
                // submit search request if enter is pressed
                onSearchSubmit();
                break;
            default:
                if (!_searchInput.value) {
                    // if there is no content in the input box, 
                    // prepopulate a "#"
                    _searchInput.value = "#";
                }
                break;
        }
        // stop event propagation to prevent any potential conflict
        ev.stopImmediatePropagation();
    }

    /**
     * Submit search input
     * Get user input and format it, then pass the input to the callback
     */
    function onSearchSubmit() {
        
        function formatInput(str) {
            // remove any space and # from the hashtag
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

    /**
     * Show error message
     * @param {String} error message
     */
    function showError(message) {
        _errorMessage.textContent = message;
        _errorMessage.style.display = "block";
        _errorMessage.classList.remove("fade-out-anime");
        _errorMessage.classList.add("fade-out-anime");
    }

    return {
        initialize: initialize,
        clear: clear,
        showError: showError,
    }
})();
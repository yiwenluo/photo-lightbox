/**
 * Lightbox module
 * 
 * A singleton module that displays a list images in a lightbox layout. 
 */
var Lightbox = (function () {
    // lightbox elements
    var _lightboxWrapper;
    var _lightbox;
    var _lightboxImage;
    var _lightboxCaption;

    // buttons
    var _nextPageButton;
    var _prevPageButton;
    var _closeButton;

    // array of image objects that needs to be displayed
    var _images = [];
    // a pointer that indicates which image in the _images array is currently displayed
    var _pointer = -1;

    /**
     * Initialize UI and bind event listeners to buttons.
     */
    function initialize() {
        // initialize lightbox elements
        _lightboxWrapper = document.querySelector(".lightbox-wrapper");
        _lightbox = _lightboxWrapper.querySelector(".lightbox");
        _lightboxImage = _lightboxWrapper.querySelector("img");
        _lightboxCaption = _lightboxWrapper.querySelector(".caption .text");
        _lightboxUsername = _lightboxWrapper.querySelector(".caption .username");

        _lightboxWrapper.onclick = function (ev) {
            // hide the lightbox layout when the background is clicked
            hide();
        }
        _lightbox.onclick = function (ev) {
            // if the click happened on the lightbox element itself, then stop
            // event propagation so that it doesn't dismiss the whole lightbox layout
            ev.stopImmediatePropagation();
        }

        _prevPageButton = _lightboxWrapper.querySelector(".prev-page");
        _nextPageButton = _lightboxWrapper.querySelector(".next-page");

        _prevPageButton.onclick = function (ev) {
            ev.stopImmediatePropagation();
            prev()
        }
        _nextPageButton.onclick = function (ev) {
            ev.stopImmediatePropagation();
            next();
        }

        _closeButton = _lightboxWrapper.querySelector(".close");
        _closeButton.onclick = hide;
    }

    /**
     * Update image array so that the lightbox knows what to display
     * @param {Array} array of image objects
     */
    function update(imageArray) {
        // reset array and pointers
        _images = imageArray;
        _pointer = -1;
    }

    /**
     * Show the lightbox layout
     */
    function show() {
        next();
        _lightboxWrapper.style.display = "block";
    }

    /**
     * Hide the lightbox layout
     */
    function hide() {
        _lightboxWrapper.style.display = "none";
    }

    /**
     * Refresh the lightbox image and caption
     * @param {Object} an image object that contains info that needs to be displayed
     */
    function refresh(image) {
        _lightboxImage.src = image.url;
        _lightboxCaption.innerText = image.caption;
        _lightboxUsername.textContent = !!image.username ? image.username + ": ": ""; 

        // reached the beginning of all images, disable prev button
        if (_pointer - 1 < 0) {
            _prevPageButton.classList.add("disabled");
        } else {
            _prevPageButton.classList.remove("disabled")
        }

        // reached the end of all images, disable next button
        if (_pointer + 1 >= _images.length) {
            _nextPageButton.classList.add("disabled");
        } else {
            _nextPageButton.classList.remove("disabled")
        }
    }

    /**
     * Turn to previous image
     */
    function prev() {
        if (_pointer - 1 >= 0) {
            _pointer -= 1;
            refresh(_images[_pointer]);
        }
    }

    /**
     * Turn to next image
     */
    function next() {
        if (_pointer + 1 < _images.length) {
            _pointer += 1;
            refresh(_images[_pointer]);
        }
        
    }

    return {
        initialize: initialize,
        update: update,
        show: show, 
        hide: hide, 
        next: next, 
        prev: prev
    }
})();
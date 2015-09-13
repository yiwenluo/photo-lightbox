var Lightbox = (function () {
    
    var _lightboxWrapper;
    var _lightbox;
    var _lightboxImage;
    var _lightboxTitle;

    var _nextPageButton;
    var _prevPageButton;

    var _images = [];
    var _pointer = -1;

    function initialize() {
        _lightboxWrapper = document.querySelector(".lightbox-wrapper");
        _lightbox = _lightboxWrapper.querySelector(".lightbox");
        _lightboxImage = _lightboxWrapper.querySelector("img");
        _lightboxTitle = _lightboxWrapper.querySelector(".img-title");

        _lightboxWrapper.onclick = function (ev) {
            hide();
        }
        _lightbox.onclick = function (ev) {
            ev.stopImmediatePropagation();
        }

        _prevPageButton = _lightboxWrapper.querySelector(".prev-page");
        _nextPageButton = _lightboxWrapper.querySelector(".next-page");

        _prevPageButton.onclick = function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            prev()
        }
        _nextPageButton.onclick = function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            next();
        }
    }

    // update local cache 
    function update(imageArray) {
        _images = imageArray;
        _pointer = -1;
    }

    function show() {
        next();
        _lightboxWrapper.style.display = "block";
    }

    function hide() {
        _lightboxWrapper.style.display = "none";
    }

    function refresh(image) {
        _lightboxImage.src = image.url;
        _lightboxTitle.innerText = image.caption;
    }

    function prev() {
        _pointer -= 1;
        if (_pointer >= 0) {
            refresh(_images[_pointer]);
        }
    }

    function next() {
        _pointer += 1;
        if (_pointer < _images.length) {
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
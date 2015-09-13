var Lightbox = (function () {
    
    var _lightboxWrapper;
    var _lightbox;
    var _lightboxImage;
    var _lightboxCaption;

    var _nextPageButton;
    var _prevPageButton;
    var _closeButton;

    var _images = [];
    var _pointer = -1;

    function initialize() {
        _lightboxWrapper = document.querySelector(".lightbox-wrapper");
        _lightbox = _lightboxWrapper.querySelector(".lightbox");
        _lightboxImage = _lightboxWrapper.querySelector("img");
        _lightboxCaption = _lightboxWrapper.querySelector(".caption .text");
        _lightboxUsername = _lightboxWrapper.querySelector(".caption .username");

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

        _closeButton = _lightboxWrapper.querySelector(".close");
        _closeButton.onclick = hide;
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
        _lightboxCaption.innerText = image.caption;
        _lightboxUsername.innerText = !!image.username ? image.username + ": ": ""; 

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

    function prev() {
        if (_pointer - 1 >= 0) {
            _pointer -= 1;
            refresh(_images[_pointer]);
        }
        

    }

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
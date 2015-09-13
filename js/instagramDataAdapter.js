var InstagramDataAdapter = (function () {
    

    function createSimpleObj(images, caption, user) {
        var image = images && images.standard_resolution;
        if (!image) {
            return null;
        }
        image.caption = (caption && caption.text);
        image.username = (user && user.username);
        return image;
    } 

    function convert(dataArray) {
        var images = [];
        if (!dataArray) {
            return images;    
        }

        dataArray.forEach(function (item, idx) {
            var obj = createSimpleObj(item.images, item.caption, item.user);
            if (obj) {
                images.push(obj);
            }
        });

        return images;
    }


    return {
        convert: convert
    };
})();
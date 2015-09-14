/**
 * Instagram Data Adapter module 
 * An adapter module that converts the data from Instagram server response to 
 * the format that can be consumed by this app.
 */
var InstagramDataAdapter = (function () {
    
    /**
     * Create a simple object that only contains necessary info
     * for the view to consume.
     */
    function createSimpleObj(images, caption, user) {
        var image = images && images.standard_resolution;
        if (!image) {
            return null;
        }
        image.caption = (caption && caption.text);
        image.username = (user && user.username);
        return image;
    } 

    /**
     * Convert the given input the a easily consumable object 
     * by this application 
     * @param {Array} Data array from Instagram service call
     * @return {Array} Array of simple image objects
     */
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
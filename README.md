# Photo Lightbox

This is a project that allows a user to search for the images using any hashtags. It displays the images in the search result in a Lightbox view. It currently only display the result from a single service call, so per Instagram's API documentation, it only returns 20 results at most. 

The search results are retrieved by calling Instagram public endpoints. Specifically, the API that is used in this application is the Tag Endpoints: https://instagram.com/developer/endpoints/tags/ 

This project does not use any 3rd party libraries due to project requirements, not even jQuery. It also doesn't have any build process, so it is a very straightforward simple application. 

Feel free to try it out yourself here: http://yiwenluo.github.io/photo-lightbox/


# Areas of Improvements
* Minification of JS files
* Use SASS to reduce code duplication and improve reusability in CSS. 
* Use Spriting for client image assets.
* Mulitple search requests for each search so that it can provide more results.
* Thumbnail view for the search results. 

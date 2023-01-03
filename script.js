const imageContainer = $('.img-container');
const loader = document.getElementById('loader');
let photosArray = []
// unsplash api 
let readyBool=false;
let imagesLoad=0;
const count = 30;
let totalImages=0;
const apiKey = 'X_jAoWs7t1YBrMFfKugODnh1VynLZtz9dtasEfALsEI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images are loaded
function imageLoaded(){
    imagesLoad++;
    if (imagesLoad===totalImages){
        readyBool=true;
        loader.hidden=true
    }
}
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);

    }
}
// create elements for links and photos 
function displayPhotos() {
    imagesLoad=0;
    totalImages=photosArray.length
    $.each(photosArray, function (index, photo) {
        let $item = $("<a>");
        $item.attr('href', photo.links.html);
        $item.attr('target', '_blank');
        let $img = $("<img>");
        $img.attr('src', photo.urls.regular);
        $img.attr('alt', photo.alt_description);
        $img.attr('title', photo.alt_description);
        $img.on('load',imageLoaded);
        $img.appendTo($item);
        imageContainer.append($item);
    });
};
// if scrolling near end of page load more photos 
$(window).scroll(function () {
    if (window.innerHeight +window.scrollY >= document.body.offsetHeight - 1000 && readyBool){
        readyBool=false;
        getPhotos();
    }
});
// onLoad 
getPhotos();
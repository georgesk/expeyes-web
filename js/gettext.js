var translatable; // jQuery array of translatable elements

$(function(){ // to be called at startup
    translatable=$(".tr");
});

/**
 * Computes a hash for translatable inner HTML
 * @param el a jQuery element
 @ @return a MD5 hash
 **/
function trHash(el){
    var inner = el.html().replace(/\s/,"","m");
    console.log(el, inner);
    var hash=CryptoJS.MD5(inner);
    console.log(hash);
}

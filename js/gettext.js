$(function(){ // to be called at startup
    // gathers translatable elements
    window.translatable=$(".tr");
});

/**
 * Computes a hash for translatable inner HTML
 * @param el a jQuery element
 @ @return a string with a MD5 hash
 **/
function trHash(el){
    var inner = el.html().replace(/\s/,"","m");
    return hash=CryptoJS.MD5(inner).toString();
}

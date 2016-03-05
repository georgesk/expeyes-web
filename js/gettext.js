$(function(){ // to be called at startup
    // gathers translatable elements
    window.translatable=$(".tr");
    for (var i=0; i<window.translatable.length; i++){
	var tr=$(window.translatable[i]);
	console.log(trHash(tr));
	$.get(
	    "http://georges.khaznadar.fr:8081/translate",
	    {
		lang:"fr",
		key: trHash(tr),
	    }).done(function(data){
		console.log("got data:", data)
	    });
    }
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

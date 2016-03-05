/**
 * creates a function to get data retreived by AJAX method
 * and put its content into the element tr
 **/
function makeTranslator(tr){
    return function(data){
	if (data.tr){
	    tr.html(data.tr);
	} else {
	    tr.html(
		"<span style='background:red; color:white;'>!</span>"+tr.html()
	    );
	}
    };
}

$(function(){ // to be called at startup
    // gathers translatable elements
    window.translatable=$(".tr");
    for (var i=0; i<window.translatable.length; i++){
	var tr=$(window.translatable[i]);
	$.get(
	    "translate",
	    {
		lang:"fr",
		key: trHash(tr),
	    }).done(makeTranslator(tr));
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

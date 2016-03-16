var supportedLang=["en", "fr"];

$(function(){ 
    var cklanguage=document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(cklanguage){
	console.log("Cookie set for language", cklanguage);
    }
    var path=window.location.pathname;
    if (! path || path=="/"){
	// no path means index.html
	path="index.html";
    }
    if (path.startsWith("/")){
	// remove leading slash
	path=path.substr(1);
    }
    for(var l =0; l < supportedLang.length; l++){
	// computes the path of the English page
	var lang=supportedLang[l];
	var prefix=supportedLang[l]+"/"
	if (path.startsWith(prefix)){
	    path=path.substr(prefix.length - 1);
	    break;
	}
    }
    var mynb=$("#mynb");
    var langFlags=$("<div>",{id: "languages"});
    for(var l =0; l < supportedLang.length; l++){
	var lang=supportedLang[l];
	var button=$("<button>",{
	    "class": "lang"
	}).on("click", changeLanguageMaker(lang, path));
	var img=$("<img>",{src: "images/lang-"+lang+".png", alt: lang+" language"});
	button.text(lang);
	button.append(img)
	mynb.append(button);
    }
});

/**
 * Returns a callback function for a language button
 * @param lang the language
 * @param path the path to the web page
 * @return a function whose side effects include cookie manipulation and 
 * change of location
 **/
function changeLanguageMaker(lang, path){
    while(path.startsWith("/")){
	// no leading slash
	path=path.substr(1);
    }
    var location="/";
    if (lang=="en"){ // English
	location="/"+path;
    } else { //non-English languages
	location="/"+lang+ "/"+ path;
    }
    return function(){
	document.cookie="lang="+lang;
	window.location.pathname=location;
    };
}


var supportedLang=["en", "fr"];   // supported languages

// var siteRoot="/docs/expeyes-web/"; // the root of the website
var siteRoot="/";

$(function(){
    var language = window.navigator.userLanguage || window.navigator.language;
    var cklanguage=document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cklanguage){
	language = cklanguage;
    }
    var path=window.location.pathname;
    if (! path || path=="/"){
	path="/index.html";
    }
    var okLang=true;
    // check that the current path matches the preferred language
    if (language=="en"){
	// no language prefix.
	for(var l =0; l < supportedLang.length; l++){
	    var lang=supportedLang[l];
	    var prefix=siteRoot+supportedLang[l]+"/";
	    if (path.startsWith(prefix)){
		okLang=false;
		path=path.substr(prefix.length - 1);
		break;
	    }
	} 
    } else {
	var prefix=siteRoot+language+"/";
	if (!path.startsWith(prefix)) {
	    okLang=false;
	    // a prefix must be shortened if there is a non-English
	    // language, only.
	    for(var l =0; l < supportedLang.length; l++){
		var lang=supportedLang[l];
		var prefix=siteRoot+supportedLang[l]+"/";
		if (path.startsWith(prefix)){
		    path=path.substr(prefix.length - 1);
		    break;
		}
	    }
	}
    }
    if (! okLang){
	// go to the preferred language, which differs from the current location
	if(language=="en"){
	    window.location.pathname=siteRoot+path;
	} else {
	    window.location.pathname=siteRoot+language+path;
	}
    }
    for(var l =0; l < supportedLang.length; l++){
	// computes the path of the English page
	var lang=supportedLang[l];
	var prefix=siteRoot+supportedLang[l]+"/";
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
	    "class": "lang",
	}).on("click", changeLanguageMaker(lang, path));
	var img=$("<img>",{
	    src: "images/lang-"+lang+".png",
	    alt: lang,
	});
	button.text(lang+" ");
	button.append(img);
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
    var location=siteRoot;
    if (lang=="en"){ // English
	location=siteRoot+path;
    } else { //non-English languages
	location=siteRoot+lang+ path;
    }
    return function(){
	document.cookie="lang="+lang;
	window.location.pathname=location;
    };
}


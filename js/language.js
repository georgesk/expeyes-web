var supportedLang=["en", "fr"];

// root should be changed to the root of the website's pages
// for example, when the main page is:
// http://www.iuac.res.in/~elab/expeyes-web-master/index.html
// root should be: /~elab/expeyes-web-master/
var root="/";

var langDirs=[];
for (var i =1; i < supportedLang.length; i++){
    // consider all non-English languages
    langDirs.push(supportedLang[i]+"/");
}

var pattern = "^"+root+"("+langDirs.join("|")+")?"+"(.*)$"
var pathRe=new RegExp(pattern);

$(function(){
    // default values if the regular expression does not match the path
    var lang="en";
    var path="index.html"
    // try to match the path
    var match=pathRe.exec(window.location.pathname);
    if (match){
	if (match[1]!=undefined){ // got a non-English language
	    lang=match[1];
	    while (lang.endsWith("/")){
		lang=lang.substr(0 , lang.length-1);
	    }
	}	
	if (match[2]!=undefined){ // fetch the path
	    path=match[2];
	}
    }
    var mynb=$("#mynb");
    var langFlags=$("<div>",{id: "languages"});
    for(var l =0; l < supportedLang.length; l++){
	var lang=supportedLang[l];
	var button=$("<button>",{
	    "class": "lang"
	}).on("click", changeLanguageMaker(lang, path));
	var img=$("<img>",{
	    src: root + "images/lang-" + lang + ".png",
	    alt: lang + " language"
	});
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
    var location = root;
    if (lang == "en"){ // English
	location = root + path;
    } else { //non-English languages
	//////// this one should be kept if the translation service is local
	// location = root + lang + "/" + path;
	///////////////////////////////////////
	//////// redirection to a server with translation service
	if (window.location.hostname == "expeyes.freeduc.org"){
	    location = root + lang + "/" + path;
	} else {
	    location = "http://expeyes.freeduc.org/" + lang + "/" + path;
	}
	
    }
    return function(){
	document.cookie="lang="+lang;
	if (location.beginsWith("http://")){
	    window.location=location;
	} else {
	    window.location.pathname=location;
	}
    };
}


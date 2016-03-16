$(function(){ 
    var supportedLang=["en", "fr"];
    var path=window.location.pathname;
    if (! path || path=="/"){
	path="/index.html";
    }
    for(var l =0; l < supportedLang.length; l++){
	// computes the path of the English page
	var lang=supportedLang[l];
	var prefix="/"+supportedLang[l]+"/"
	if (path.startsWith(prefix)){
	    path=path.substr(prefix.length - 1);
	    break;
	}
    }
    var mynb=$("#mynb");
    var langFlags=$("<div>",{id: "languages"});
    for(var l =0; l < supportedLang.length; l++){
	var lang=supportedLang[l];
	var prefix="/"+supportedLang[l]+"/"
	var target="";
	if (l==0){ // English
	    target=path;
	} else { //non-English languages
	    target="/"+lang+ path;
	}
	var anchor=$("<a>",{href: target, "class": "lang"});
	var img=$("<img>",{src: "images/lang-"+lang+".png", alt: lang+" language"});
	anchor.text(lang);
	anchor.append(img)
	mynb.append(anchor);
    }
});


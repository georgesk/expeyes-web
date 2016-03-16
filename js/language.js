$(function(){ 
    var supportedLang=["en", "fr"];
    var mynb=$("#mynb");
    var langFlags=$("<div>",{id: "languages"});
    for(var l =0; l < supportedLang.length; l++){
	var target="/";
	if (l!=0){ //non-English languages
	    target="/"+supportedLang[l]+"/";
	}
	var anchor=$("<a>",{href: target, "class": "lang"});
	var img=$("<img>",{src: "images/lang-"+supportedLang[l]+".png", alt: supportedLang[l]+ " language"});
	anchor.text(supportedLang[l]);
	anchor.append(img)
	mynb.append(anchor);
    }
});


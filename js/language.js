$(function(){ 
    var supportedLang=["en", "fr"];
    var mynb=$("#mynb");
    var langFlags=$("<div>",{id: "languages"});
    for(var l =0; l < supportedLang.length; l++){
	var target="/";
	if (l!="en"){
	    target="/"+l+"/";
	}
	var anchor=$("<a>",{href: target, "class": "lang"});
	var img=$("<img>",{src: "images/lang-"+l+".png", alt: "language "+l});
	anchor.append(img)
	anchor.text(l);
	mynb.append(anchor);
    }
});


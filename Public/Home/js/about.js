$(function(){
	
	var mainH = $("#main").height();
	var menuH = $("#menu").height();
	if (menuH<mainH) {
		$("#menu").height( mainH );
	}else{
		$("#main").height( menuH );
	};


})
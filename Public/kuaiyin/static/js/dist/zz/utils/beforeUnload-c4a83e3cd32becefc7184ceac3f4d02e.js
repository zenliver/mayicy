define("zz/utils/beforeUnload",["jquery/jquery/1.7.2/jquery"],function(a,b){b.bind=function(b){a("jquery/jquery/1.7.2/jquery").browser.msie||(window.onbeforeunload=function(a){return b||"内容还未保存!"})},b.unbind=function(){window.onbeforeunload=null}});
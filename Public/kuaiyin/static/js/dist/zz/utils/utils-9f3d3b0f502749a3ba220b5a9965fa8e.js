define("zz/utils/utils",[],function(a,b){"use strict";b.getUrlData=function(a){var b=new RegExp("(^|&)"+a.toLowerCase()+"=([^&]*)(&|$)"),c=window.location.search.substr(1).match(b);return null!=c?decodeURI(c[2]):""},b.getDPI=function(){var a=new Array;if(void 0!=window.screen.deviceXDPI)return window.screen.deviceXDPI;var b=document.createElement("DIV");return b.style.cssText="width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden",document.body.appendChild(b),a[0]=parseInt(b.offsetWidth),b.parentNode.removeChild(b),a[0]},b.px2mm=function(a,c){return a/((c||b.getDPI())/25.4)},b.mm2px=function(a,c){return a/(25.4/(c||b.getDPI()))},b.pxToInt=function(a){return parseInt(a||0)},b.ratioImg=function(a,b,c,d){var e=c/a,f=d/b,g=f>e?e:f;return 1>g?[a*g,b*g,g]:[a,b,1]}});
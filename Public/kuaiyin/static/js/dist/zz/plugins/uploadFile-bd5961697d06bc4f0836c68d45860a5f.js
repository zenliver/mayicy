define("zz/plugins/uploadFile",["jquery/jquery/1.7.2/jquery"],function(a){"use strict";function b(a,b){var c,e=a.find(":file").get(0).files;c=new FormData(a.get(0)),d.each(e,function(a,b){c.append("file",b)}),d.ajax({url:a.attr("action"),type:"post",processData:!1,contentType:!1,data:c,success:function(a){b(a)}})}function c(a,b){var c,e="iframe-"+d.now();c=d('<iframe id="NAME" name="NAME" style="display:none">'.replace(/NAME/g,e)).appendTo(document.body),c.attr("src",'javascript:document.open();document.domain="http://www.mayicy.cn/Public/kuaiyin/static/js/dist/zz/plugins/zhubajie.com";document.close();'),c.on("load",function(){var d=c[0].contentWindow.document.body.innerHTML.trim();d&&(d=JSON.parse(d),b(d)),c.remove(),a.find(":file").each(function(){a.after(a.clone(!0).val("")).remove()})}),a.attr("target",e),a.submit()}var d=a("jquery/jquery/1.7.2/jquery"),e='<form action="{{action}}" method="post" enctype="multipart/form-data"><input type="file" name="file" class="none" {{attr}} /></form>';d.fn.extend({uploadFile:function(a){var f=d(e.replace("{{attr}}",a.attr||"").replace("{{action}}",a.action)).appendTo(document.body),g=this;f.find(":file").change(function(){a.change.call(g,d(this).val()),a.isPrevent||(window.FormData?(b(f,a.success),f.remove()):(c(f,a.success),f.remove()))}).click()}})});
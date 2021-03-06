define("common/ajax",["jquery/jquery/1.7.2/jquery","zz/ui/info","zz/ui/Dialog","zz/ui/alert","zz/ui/confirm","zz/ui/Mask","zz/core/Class","zz/ui/base/Panel","common/utils/utils","arale/cookie/1.0.2/cookie","common/top-eventbind"],function(a){function b(a){if(a){var b=new g(a).open();return function(){b.close()}}}var c=a("jquery/jquery/1.7.2/jquery"),d=a("zz/ui/info"),e=a("zz/ui/alert"),f=a("zz/ui/confirm"),g=a("zz/ui/Mask");isLogin=a("common/utils/utils").isLogin;var h=function(){var a={};return function(b,c,d){b=b||"",c=c||{};var e=[b];for(var f in c)e.push(f);e=e.join("");var g=a[e];g&&4!=g.readyState&&g.abort(),a[e]=d}}();c.ajaxSetup({cache:!1,scriptCharset:"utf-8",dataType:"json",timeout:6e4,statusCode:{}}),c.ajaxPrefilter(function(a,g,i){var j=g;return j.needLogin&&!isLogin()?(i.abort(),void e("您还没有登录哦！")):j.confirm?(i.abort(),void f(j.confirm,function(){j.confirm=!1,c.ajax(g)})):(h(a.url,g.data,i),i.always(b(j.mask)),a.success=function(b){b&&(b.msg&&j.showMessage&&(200==b.code?d(b.msg):e(b.msg)),c.isFunction(g.success)&&g.success.apply(a.context||this,arguments))},void(a.error=function(b,d){"timeout"===d&&(j.alertOnTimeout&&e("请求超时，请重试！"),c.isFunction(j.timeoutFn)&&j.timeoutFn.apply(a.context||this,arguments)),c.isFunction(g.error)&&g.error.apply(a.context||this,arguments)}))})}),define("common/utils/utils",["arale/cookie/1.0.2/cookie","jquery/jquery/1.7.2/jquery","common/top-eventbind","common/logout"],function(a,b){"use strict";var c=a("arale/cookie/1.0.2/cookie"),d=a("jquery/jquery/1.7.2/jquery"),e=a("common/top-eventbind");b.isLogin=function(){return c.get("userid")&&c.get("kyln")?!0:!1},b.isOnlyLoginZhubajie=function(){return c.get("userid")&&!c.get("kyln")?!0:!1},b.updateTopBar=function(){var a='<a href="http://home.zhubajie.com/{{open_id}}/" target="_blank">{{nickname}}</a>\n<span class="global-tb-designer">\n    <a href="http://www.mayicy.cn/templet/designer">设计师专区</a>\n    <ul>\n        <li><a href="http://www.zhubajie.com/active/wikeyentrance" target="_blank">免费开店</a></li>\n        <li><a href="http://www.mayicy.cn/support/service/" target="_blank">百万扶持</a></li>\n        <li><a href="http://www.mayicy.cn/templet/designer" target="_blank">模板案例征集</a></li>\n        <li><a href="http://www.mayicy.cn/myky/design" target="_blank">我设计的模板</a></li>\n        <li><a href="http://www.mayicy.cn/myky/case" target="_blank">我上传的案例</a></li>\n        <li><a href="http://www.mayicy.cn/myky/imitation" target="_blank">我的仿制模板</a></li>\n        <li><a href="http://www.mayicy.cn/myky/fz_opus/" target="_blank">我的仿制作品</a></li>\n    \n    </ul>\n</span>\n<span class="global-tb-usermsg">\n    <a href="javascript:;"><i class="iconfont"></i></a>\n    <span class="tip">你有新的消息！</span>\n    <ul>\n        <li><a id="usermsg-trade" href="http://u.zhubajie.com/notice/list-type-1" target="_blank">查看交易提醒</a></li>\n        <li><a id="usermsg-recommend" href="http://u.zhubajie.com/officialtaskinvite/snatch" target="_blank">查看派单通知</a></li>\n        <li><a id="usermsg-system" href="http://u.zhubajie.com/notice/list-type-2" target="_blank">查看广告/活动信息</a></li>\n        <li><a id="usermsg-replay" href="http://u.zhubajie.com/taskcomment/commentlist-state-1.html" target="_blank">查看评论</a></li>\n        <li><a id="usermsg-logs" href="http://u.zhubajie.com/notice/chat" target="_blank">查看聊天记录</a></li>\n        <li><a id="usermsg-bid" href="http://u.zhubajie.com/taskcomment/bids" target="_blank">查看参与</a></li>\n        <li><a id="usermsg-thx" href="http://u.zhubajie.com/task/seller?s=5" target="_blank">查看谢谢</a></li>\n        <li><a id="usermsg-fans" href="http://u.zhubajie.com/fav/index-type-2" target="_blank">查看粉丝</a></li>\n    </ul>\n</span>\n<a href="javascript:;" data-action="logout" >[退出]</a>\n<a href="http://www.mayicy.cn/help">帮助</a>\n',b=d(".global-top-bar-right");try{window.parent&&window.parent.ZDK&&(console.log("刷新主站头部."),window.parent.ZDK.passport.refreshTopbar())}catch(c){}b[0]&&d.get("/ajax/user_info").done(function(c){c&&200===c.code&&(b.html(a.replace("{{open_id}}",c.data.open_id).replace("{{nickname}}",c.data.nickname)),e())})}}),define("common/top-eventbind",["jquery/jquery/1.7.2/jquery","common/logout"],function(a){"use strict";function b(){d(".global-tb-usermsg").on("mouseenter",function(){d(this).removeClass("new")}),d.ajax({url:"http://u.zhubajie.com/notice/getcount",dataType:"jsonp",jsonp:"jsonpcallback",success:function(a){var b=0;d(".global-tb-usermsg .highlight").remove(),d.each(a,function(a,c){c&&(b+=c,d('<span class="highlight">').text(c).appendTo("#usermsg-"+a))}),d(".global-tb-usermsg").toggleClass("new",!!b)}})}function c(){d(".global-top-bar").find("[data-action=logout]").click(function(b){a("common/logout").logout(),b.preventDefault()})}var d=a("jquery/jquery/1.7.2/jquery");return function(){console.log("bind top events..."),b(),c()}});
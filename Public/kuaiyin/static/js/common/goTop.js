/**
 * 回到顶部
 * @author by liuwencheng
 * @date 2013-8-15
 * @update 添加客服链接
 */
define(function(require,exports) {
    "use strict"
    var scrollTo = require('zz/plugins/scrollIntoView')
        ,$ = require('jquery')

    function init() {
        var $pin = $('<div class="global-pin"><a href="javascript:;" class="gotop"><i class="iconfont"></i></a><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=843598486&site=%E5%BF%AB%E5%8D%B0&menu=yes" class="chat"><i class="iconfont"></i><span>客服</span></a></div>').appendTo(document.body)

        $(window).scroll(function(){
            var l = $(this).scrollTop();
            $pin.toggleClass('ontop', l===0);
        }).scroll();

        $pin.find('.gotop').click(function(){
            scrollTo(0, 500, "easeOutExpo")
        });
    }

    init()
})

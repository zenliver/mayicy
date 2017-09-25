/**
 * 头部用户条事件绑定
 * 在common/utils/utils 中检测用户登陆后还要触发重新绑定
 * @author by liuwencheng
 * @date 14-4-16
 */
define(function(require,exports) {
    "use strict"
    var $ = require('jquery')

    function loadUserMessage(){
        $('.global-tb-usermsg').on('mouseenter', function(){
            $(this).removeClass('new');
        });
        $.ajax({
            url: 'http://u.zhubajie.com/notice/getcount',
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(data, state, xhr){
                var hasNew = 0;

                $('.global-tb-usermsg .highlight').remove();
                $.each(data, function(k, v){
                    if(v){
                        hasNew += v;
                        $('<span class="highlight">').text(v).appendTo('#usermsg-' + k);
                    }
                });
                $('.global-tb-usermsg').toggleClass('new', !!hasNew);
            }
        });
    }

    /**
     * 登出按钮
     * @update liuwencheng 14-4-14
     */
    function logoutBtnInit(){
        $(".global-top-bar").find("[data-action=logout]").click(function(e){
            require('common/logout').logout()
            e.preventDefault()
        })
    }

    return function () {
        console.log('bind top events...')
        loadUserMessage()
        logoutBtnInit()
    }
})
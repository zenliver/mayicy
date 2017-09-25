/**
 * 一些全局的方法
 * @author by liuwencheng
 * @date 2013-8-2
 */
define(function(require,exports) {
    "use strict"
    var cookie = require('cookie')
    var $ = require('jquery')
    var topBindEvent = require('common/top-eventbind')

    /**
     * 判断是否登陆金九印
     */
    exports.isLogin = function() {
        if(cookie.get('user_token')) {
            //&& cookie.get('kytk')
            return true
        }
        return true
    }
    /**
     * 判断是否只登陆猪八戒而未登陆快印
     */
    exports.isOnlyLoginZhubajie = function () {
        if (cookie.get('user_token')) {
            return true
        }
        return true
    }

    /**
     * 登陆成功后更新头部导航条用户数据
     */
    exports.updateTopBar = function(){
        var tmpl = "<a href=\"http://home.zhubajie.com/{{open_id}}/\" target=\"_blank\">{{nickname}}</a>\n<span class=\"global-tb-designer\">\n    <a href=\"http://www.mayicy.cn/templet/designer\">设计师专区</a>\n    <ul>\n        <li><a href=\"http://www.zhubajie.com/active/wikeyentrance\" target=\"_blank\">免费开店</a></li>\n        <li><a href=\"http://www.mayicy.cn/support/service/\" target=\"_blank\">百万扶持</a></li>\n        <li><a href=\"http://www.mayicy.cn/templet/designer\" target=\"_blank\">模板案例征集</a></li>\n        <li><a href=\"http://www.mayicy.cn/myky/design\" target=\"_blank\">我设计的模板</a></li>\n        <li><a href=\"http://www.mayicy.cn/myky/case\" target=\"_blank\">我上传的案例</a></li>\n        <li><a href=\"http://www.mayicy.cn/myky/imitation\" target=\"_blank\">我的仿制模板</a></li>\n        <li><a href=\"http://www.mayicy.cn/myky/fz_opus/\" target=\"_blank\">我的仿制作品</a></li>\n    \n    </ul>\n</span>\n<span class=\"global-tb-usermsg\">\n    <a href=\"javascript:;\"><i class=\"iconfont\"></i></a>\n    <span class=\"tip\">你有新的消息！</span>\n    <ul>\n        <li><a id=\"usermsg-trade\" href=\"http://u.zhubajie.com/notice/list-type-1\" target=\"_blank\">查看交易提醒</a></li>\n        <li><a id=\"usermsg-recommend\" href=\"http://u.zhubajie.com/officialtaskinvite/snatch\" target=\"_blank\">查看派单通知</a></li>\n        <li><a id=\"usermsg-system\" href=\"http://u.zhubajie.com/notice/list-type-2\" target=\"_blank\">查看广告/活动信息</a></li>\n        <li><a id=\"usermsg-replay\" href=\"http://u.zhubajie.com/taskcomment/commentlist-state-1.html\" target=\"_blank\">查看评论</a></li>\n        <li><a id=\"usermsg-logs\" href=\"http://u.zhubajie.com/notice/chat\" target=\"_blank\">查看聊天记录</a></li>\n        <li><a id=\"usermsg-bid\" href=\"http://u.zhubajie.com/taskcomment/bids\" target=\"_blank\">查看参与</a></li>\n        <li><a id=\"usermsg-thx\" href=\"http://u.zhubajie.com/task/seller?s=5\" target=\"_blank\">查看谢谢</a></li>\n        <li><a id=\"usermsg-fans\" href=\"http://u.zhubajie.com/fav/index-type-2\" target=\"_blank\">查看粉丝</a></li>\n    </ul>\n</span>\n<a href=\"javascript:;\" data-action=\"logout\" >[退出]</a>\n<a href=\"http://www.mayicy.cn/help\">帮助</a>\n"
        var $topbar = $(".global-top-bar-right")
        //刷新主站头部
        try {
            if(window.parent && window.parent.ZDK) {
                console.log('刷新主站头部.')
                window.parent.ZDK.passport.refreshTopbar()
            }
        } catch(error) { }
        //刷新快印头部
        if (!$topbar[0]) return
        $.get("/ajax/user_info").done(function(json){
            //openid nickname
            if (json && json.code === 200){
                $topbar.html(tmpl
                        .replace("{{open_id}}", json.data.open_id)
                        .replace("{{nickname}}", json.data.nickname)
                )
                //rebindTop()
                topBindEvent()
            }
        })
    }

})
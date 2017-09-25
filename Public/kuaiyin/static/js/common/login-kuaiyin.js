/**
 * 注意: 该组建用于在主站已经登陆情况下快印登陆
 * @author by liuwencheng
 * @date 14-4-16
 */
define(function(require,exports) {
    "use strict"
    var $ = require('jquery'),
        cookie = require('cookie')
    /**
     * @param {Function} 设定成功后的回调
     */
    function kyLogin(cb) {
        getLoginToken(function(token) {
            $.post("/account/login", {
                token: token
            })
            .done(function(json) {
                cb && cb(json)
                require('common/utils/utils').updateTopBar()//更新头部导航条
            })
        })
    }
     
    function getLoginToken(cb) {
        /*
        jsonp("https://login."+global.zbj_domain+"/login/islogin", null,function(json) {
            if (json.state === 1) {
                //json.token
                //cookie.set('kyzbjtk', json.token, {expires:1,path: '/'})
                cb && cb(json.token)
            }
        })
        */
    }

    function jsonp(url, data, cb) {
        $.ajax({
            url: url,
            type: "get",
            data: data,
            jsonp: "jsonpcallback",
            dataType: "jsonp",
            success: cb
        })
    }

    return kyLogin


})
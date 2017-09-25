/**
 * 主站登陆弹窗
 * @author by liuwencheng
 * @date 14-4-9
 */
define(function(require,exports) {
    "use strict"
    require('zz/plugins/alertEmpty')
    require('zz/plugins/actionMap')
    var alert = require('zz/ui/alert')
    var Dialog = require('zz/ui/Dialog')
    var info = require('zz/ui/info')
    var $ = require('jquery')
    var dlg
    var $target
    var seed = null             //验证码key
    var _isLoading = false      //登陆button是否在加载状态
    var _isPage = false         //是否为登陆页面, 如果是登陆弹窗则为false
    var updateTopBar = require('common/utils/utils').updateTopBar
    //var _callback

    function loading(isLoading, target){
        if(isLoading){
            $(target).addClass("ui-button-ldisable").text("登陆中...")
            _isLoading = true
        } else{
            $(target).removeClass("ui-button-ldisable").text("立即登陆")
            _isLoading = false
        }
    }

    function submitLogin (e){
        var $username = $target.find("[name=username]")
        var $password = $target.find("[name=password]")
        var isCorrect = true
        if (_isLoading) return
        if ($username.val().trim() === ""){
            $username.alertEmpty()
            isCorrect = false
        }

        if ($password.val().trim() === ""){
            $password.alertEmpty()
            isCorrect = false
        }

        if (isCorrect){
            loading(true, e.currentTarget)
            var data = {
                username: $username.val().trim(),
                password: $password.val().trim(),
                _: (new Date).getTime()
            }
            if (seed){
                data.seed = seed
                data.catcha = $target.find("[name=verify]").val().trim()
            }
            jsonp("https://login."+global.zbj_domain+"/login/dologin",data,function(json) {
                console.log(json)
                if (json.state == -3){
                    showVerifyCode()
                    alert('请输入正确验证码')
                } else if (json.state == 1){
                    require('./login-kuaiyin')(function(json) {
                        if (json && json.code == 200) {
                            //5分钟
                            info('登陆成功了')
                            if (_isPage) location.href = json.data.url
                            if (dlg){
                                dlg.close()
                                updateTopBar() //如果为登陆弹窗重绘头部bar
                            }
                        } else {
                            alert('登陆出错了，请重试!!')
                        }
                        loading(false, e.currentTarget)
                    })
                    return
                } else{
                    alert(json.msg)
                    changeVerifyImg ()
                }
                loading(false, e.currentTarget)
            })
        }

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

//userid
    function showVerifyCode (){
        $target.find(".verify-item").show()
        changeVerifyImg()
    }

    function changeVerifyImg () {
        var $verifyItem = $target.find(".verify-item")
        $verifyItem.find("input").val("")
        seed = getRandomSeed(13)
        $verifyItem.find("img").attr("src", "http://"+global.zbj_domain+"/Public/verify?seed=" + seed)
    }

    function getRandomSeed (seedCount){
/*        var num = ""
        var _search = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        while (seedCount){
            seedCount --
            num = num +  _search[parseInt(Math.random() * _search.length)]
        }
        return num*/
        return Math.random().toString(36).substr(3, seedCount)
    }


    exports.closeDialog = function (){
        if (dlg) dlg.close()
    }

    exports.loginDialog = function (cb){
        //_callback = cb
        if (!dlg){
            dlg = new Dialog({
                hasTitle: true,
                hasFoot: false,
                title: "登陆金九印：",
                innerHTML: "<div class=\"global-login-dialog\">\n    <ul>\n        <li><label>账号：</label><input name=\"username\" type=\"text\" placeholder=\"请输入手机号码/邮箱\"></li>\n        <li><label>密码：</label><input name=\"password\" type=\"password\" placeholder=\"请输入密码\"></li>\n        <li class=\"verify-item\"><label>验证码：</label><input name=\"verify\" type=\"text\" placeholder=\"验证码\">\n            <a href=\"javascript:;\" data-action=\"change-verify\"><img class=\"verify-item-img\" src=\"\">换一张</a>\n        </li>\n        <li>\n            <a class=\"ui-button ui-button-lred mr10\" data-action=\"submit\">立即登陆</a>\n            <a href=\"https://login.zhubajie.com/retrieve\" target=\"_blank\">忘记密码？</a>\n            <a href=\"https://login.zhubajie.com/register\" target=\"_blank\">注册</a>\n        </li>\n    </ul>\n</div>",
                actions: {
                    "submit": submitLogin,
                    "change-verify": changeVerifyImg
                },
                closeToDispose: false
            })
            $target = dlg.$target
        }
        dlg.open()
        showVerifyCode()    //一开始就显示验证码输入
    }

    //登陆页面注册调用
    exports.loginPageInit = function (){
        $target = $("#loginPageDialog")
        $target.actionMap({
            "submit": submitLogin,
            "change-verify": changeVerifyImg
        })
        $(window).keydown(function(e){
            var keyCode = require('zz/utils/keyCode').get
            if (keyCode('enter') === e.keyCode) {
                e.currentTarget = $target.find('[data-action=submit]')
                submitLogin(e)
            }
        })
        _isPage = true      //为登陆页面
        showVerifyCode()    //一开始就显示验证码输入
    }
})
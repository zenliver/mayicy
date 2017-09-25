/**
 * 用户使用编辑器接口
 *      购买，保存
 * @author by liuwencheng
 * @date 2013-11-13
 */
define(function(require,exports) {
    "use strict"
    var objs = require("zz/utils/objs")
        ,cookieName = "diyCookieData"
        ,cookie = require('cookie')
        ,$ = require('jquery')
        ,info = require('zz/ui/info')
        ,alert = require('zz/ui/alert')
    /*
     * 用户保存
     *  opts: {
     *      canvasArr:
     *      preCb       保存前回调，下同
     *      doneCb      成功回调
     *      alwaysCb    总是运行的回调
     *      noInfo: {Boolean}  保存失败是否提示消息
     *  }
     */
    function save (opts) {
        opts.preCb && opts.preCb()
        saveCookie(opts.canvasArr)
        global.content.pages.forEach(function(item,index){
            objs.extend(item,opts.canvasArr[index].getDiyAllData())
        })
        //创建用户模版
        if (!global.user_template_id) {
            $.post("/Goods/create", {
                'template_id': global.template_id,
                "product_id": global.product_id,
                "generic_id":global.generic_id,
                'content': JSON.stringify(global.content),
                "csrf_token": $("#csrf_token").val()
            })
            .done(function(json){
                if (json.code === 200) {
                    !opts.noInfo && info('保存成功')
                    global.user_template_id = json.data.id
                    opts.doneCb && opts.doneCb()
                } else {
                    json.msg && alert(json.msg)
                }
            })
            .always(function(){
                opts.alwaysCb && opts.alwaysCb()
            })
        }
        //修改用户模版
        else {
            $.post("/Goods/edit", {
                'template_id': global.user_template_id,
                'content': JSON.stringify(global.content),
                "csrf_token": $("#csrf_token").val()
            })
            .done(function(json){
                if (json.code === 200) {
                    !opts.noInfo && info('保存成功')
                    opts.doneCb && opts.doneCb()
                } else {
                    json.msg && alert (json.msg)
                }
            })
            .always(function(){
                opts.alwaysCb && opts.alwaysCb()
            })
        }
    }
    /**
     * 保存到cookie
     */
    function saveCookie (canvasArr) {
        var diyCookieData = []
        canvasArr.forEach(function(canvas, index){
            diyCookieData[index] = {}
            canvas.childElems.forEach(function($elem){
                if ($elem.attr("data-type") === "diy_text")  {
                    diyCookieData[index] [$elem.attr('data-mean')] = $elem.attr('data-content')
                }
            })

        })
        cookie.set(cookieName, JSON.stringify(diyCookieData), {expires:30,path:"/templet"})

    }

    /**
     * 获取diycookie
     */
    function getCookie () {
        return JSON.parse(cookie.get(cookieName) || "[]")
    }
    /**
     * 用户购买
     * @param {Function} 购买之后的回调
     */
    function buy (alwayscb) {
        $.post('/Goods/pdf', {
            'template_id': global.user_template_id,
            "product_id": global.product_id,
            "csrf_token": $("#csrf_token").val()
        })
        .done(function(json){
            if (json.code === 200) {
                info('购买成功')
                require('zz/utils/beforeUnload').unbind() //取消

                var cardcode = $(".diy-tb-item.diy-tb-item-focus").data('code');
                if(cardcode){
                    var href = json.data.url + '?code='+cardcode;
                }else{
                    var href = json.data.url + '?';
                }
                if(/[?&]a=1(&|$)/.test(location.href)){
                    href += '&a=1';
                }
/*                if(/[?&]iframe=1(&|$)/.test(location.href)){
                    href += '&iframe=1';
                }*/
                //debugger;
                if ($(document.body).hasClass('global-iframe')) {
                    href += '&iframe=1';
                }
                if (global.easy_iframe)  { //如果为名片频道首页的简单编辑器, 则让父节点跳转
                    window.parent.location.href  = "http://www.zhubajie.com/c-mpkpsj/mpsj/index-reuse.html" + "?iframe=" + encodeURIComponent(href)
                } else {
                    location.href= href;
                }
            } else {
                json.msg && alert (json.msg)
            }
        })
        .always(function(){
            alwayscb && alwayscb()
        })
    }

    /**
     * 仿制保存
     *  opts: {
     *      canvasArr:
     *      preCb       保存前回调，下同
     *      doneCb      成功回调
     *      alwaysCb    总是运行的回调
     *      noInfo: {Boolean}  保存失败是否提示消息
     *  }
     */
    function fangzhiSave (opts) {
        opts.preCb && opts.preCb()
        global.content.pages.forEach(function(item,index){
            objs.extend(item,opts.canvasArr[index].getDiyAllData())
        })
        //创建用户模版
        if (!global.user_imitation_id) {
            $.post("/Goods/create", {
                'imitation_id': global.imitation_id,
                'pid': global.pid,
                "name": global.name,
                'content': JSON.stringify(global.content),
                "task_id": global.task_id
            })
                .done(function(json){
                    if (json.code === 200) {
                        !opts.noInfo && info('保存成功')
                        global.user_imitation_id = json.data.id
                        opts.doneCb && opts.doneCb()
                    } else {
                        json.msg && alert(json.msg)
                    }
                })
                .always(function(){
                    opts.alwaysCb && opts.alwaysCb()
                })
        }
        //修改用户模版
        else {
            $.post("/fz/templet/api/edit", {
                'imitation_id': global.user_imitation_id,
                'content': JSON.stringify(global.content)
            })
                .done(function(json){
                    if (json.code === 200) {
                        !opts.noInfo && info('保存成功')
                        opts.doneCb && opts.doneCb()
                    } else {
                        json.msg && alert (json.msg)
                    }
                })
                .always(function(){
                    opts.alwaysCb && opts.alwaysCb()
                })
        }

    }

    /**
     * 生成pdf接口
     */
    //var isTimeout = false
    function fangzhiPdf (alwayscb) {
        var TIME_STAMP = 10 * 1000 //每隔几分钟发一次请求
        var DEFALUT_TIME_COUNT = 60 //总共轮询的次数
        var timeout_count = DEFALUT_TIME_COUNT
/*        if (isTimeout) {
            _sleep()
            return
        }*/
        $.post('/Goods/pdf', {
            'imitation_id': global.user_imitation_id
        })
            .done(function(json){
                if (json.code === 200) {
                    //info('购买成功')
                    _sleep()
                    //$.get('/fz/templet/file/download/' + global.user_imitation_id)
                } else {
                    json.msg && alert (json.msg)
                    alwayscb && alwayscb()
                }
            })
            .fail(function(){
                alwayscb && alwayscb()
            })

        function _sleep () {
            setTimeout(function(){
                $.get('/fz/templet/file/download?id=' + global.user_imitation_id)
                    .done(function(json){
                        if (json.code === 200) {
                            //info('购买成功')
                            //require('zz/utils/beforeUnload').unbind() //取消
                            alwayscb && alwayscb()
                            //$.get('/fz/templet/file/download/' + global.user_imitation_id)
                            alert('<a class="ui-button ui-button-lred" href="'+json.data.url+'" download >点击此处下载pdf</a>', null, "关闭")

                        } else {
                            if (timeout_count !== 0) {
                                _sleep()
                            } else {
                                alert('生成pdf超时, 请重新生成!!')
                                //isTimeout = true
                                timeout_count = DEFALUT_TIME_COUNT
                                alwayscb && alwayscb()
                            }
                        }
                    })
                    .fail(function(){
                        alert('生成pdf错误，请重试!!')
                        alwayscb && alwayscb()
                    })
                timeout_count --
            }, TIME_STAMP)
        }

    }

    exports.save = save
    exports.buy = buy
    exports.fangzhiSave = fangzhiSave
    exports.fangzhiPdf = fangzhiPdf
    exports.saveCookie = saveCookie
    exports.getCookie = getCookie

})
/**
 * ajax.js
 * jQuery ajax 方法预处理
 * 包括异常处理、重复请求处理、登录检查、操作确认、遮罩显示
 *
 * @author xuhaiqiang
 * @date 2013-09-06
 */
define(function(require, exports){
    var $ = require('jquery'),
        info = require('zz/ui/info'),
        alert = require('zz/ui/alert'),
        confirm = require('zz/ui/confirm'),
        Mask = require('zz/ui/Mask')
        isLogin = require('common/utils/utils').isLogin;

    var defaultActions = {
        // 操作成功
        200: function(){
            ;
        }
    };
    /**
     * 大量重复的请求会增加服务器压力
     * 对于重复的请求，取消旧的
     * @param  {String} url
     * @param  {Object} data
     * @param  {Object} jqXHR
     */
    var abortOnRetry = (function(){
        var xhrCaches = {};

        return function (url, data, jqXHR){
            url = url || '';
            data = data || {};

            // 请求标识由网址和数据键名确定
            var xhrId = [url];
            for(var key in data){
                xhrId.push(key);
            }
            xhrId = xhrId.join('');

            // 存在缓存并且请求未完成时取消请求
            var cacheXhr = xhrCaches[xhrId];
            if(cacheXhr && cacheXhr.readyState != 4){
                cacheXhr.abort();
            }

            xhrCaches[xhrId] = jqXHR;
        }
    })();

    /**
     * 显示遮罩
     * @param  {Object} maskOpt
     * @return {Function}       用于关闭遮罩的函数
     */
    function showMask(maskOpt){
        if(maskOpt){
            var mask = new Mask(maskOpt).open();

            return function(){
                mask.close();
            }
        }
    }

    // 设置 ajax 默认参数
    $.ajaxSetup({
        cache: false,
        scriptCharset: 'utf-8',
        dataType: 'json',
        timeout: 60000,
        // HTTP 异常
        statusCode: {
/*            500: function (){
                alert('服务器错误（500），请稍后重试！');
            },
            503: function (){
                alert('服务器繁忙（503），请刷新重试！');
            },
            504: function (){
                alert('请求超时（504），请刷新重试！');
            }*/
/*            502: function () {
                alert('请求失败 (502), 请刷新重试！')
            }*/
        }
    });

    /**
     * @param  {Object} options
     *         {
     *             needLogin:   {Boolean} 要求用户登录
     *             confirm:     {String|Array} 显示确认信息
     *             mask:        {Object}  显示遮罩
     *             ignoreDefaultAction: {Array|String} 不使用默认处理的状态
     *             showMessage: {Boolean} 显示服务器返回的 msg 属性
     *             alertOnTimeout: {Boolean} 超时时弹出提示
     *             timeoutFn:   {Function} 超时时执行的函数
     *         }
     * @param  {Object} originalOptions
     * @param  {Object} jqXHR
     */
    $.ajaxPrefilter(function (options, originalOptions, jqXHR){
        var customOpt = originalOptions;

        // 要求登录
        if(customOpt.needLogin && !isLogin()){
            jqXHR.abort();
            alert('您还没有登录哦！');
            // todo show login dialog
            // todo repost
            return;
        }

        // 确认操作
        if(customOpt.confirm){
            jqXHR.abort();

            confirm(customOpt.confirm, function(){
                customOpt.confirm = false;
                $.ajax(originalOptions);
            });

            return;
        }

        // 处理重复请求
        abortOnRetry(options.url, originalOptions.data, jqXHR);

        // 显示遮罩，并在请求完成后关闭
        jqXHR.always(showMask(customOpt.mask));

        options.success = function (data, state, jqXHR){
            // 没有返回数据
            if(!data){
                // alert('未知错误，请重试！');
                return;
            }

            // 服务器返回的消息可以用 ignoreMessage 参数忽略显示
            if(data.msg && customOpt.showMessage){
                if(data.code == 200){
                    info(data.msg);
                }else{
                    alert(data.msg);
                }
            }

            // 根据返回的状态码执行默认操作
            // if(!customOpt.ignoreDefaultAction == '*'){
            //     defaultActions['*'] &&
            //         defaultActions['*'].apply(options.context || this, arguments);

            //     if(customOpt.ignoreDefaultAction.indexOf(data.code) == -1){
            //         defaultActions[data.code] &&
            //             defaultActions[data.code].apply(options.context || this, arguments);
            //     }
            // }

            //
            if($.isFunction(originalOptions.success)){
                originalOptions.success.apply(options.context || this, arguments);
            }
        }

        options.error = function(xhr, state, errorThrown){
            if(state === 'timeout'){
                if(customOpt.alertOnTimeout){
                    alert('请求超时，请重试！');
                }

                if($.isFunction(customOpt.timeoutFn)){
                    customOpt.timeoutFn.apply(options.context || this, arguments);
                }
            }

            if($.isFunction(originalOptions.error)){
                originalOptions.error.apply(options.context || this, arguments);
            }
        }
    });
});

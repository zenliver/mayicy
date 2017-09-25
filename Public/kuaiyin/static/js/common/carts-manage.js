 /**
  * 购物车管理
  *
  * @author by liuwencheng
  * @date 2013-8-10
  */
 define(function(require,exports) {
     "use strict"
    var cookie = require('cookie')
        ,$ = require('jquery')
        ,assertType = require('zz/utils/asserts').assertType
        ,info = require('zz/ui/info')
        ,isLogin = require('common/utils/utils').isLogin
        ,alert = require('zz/ui/alert')


    var TIME_STAMP = 1000

    function get() {
        // return cookie.get('carts');
    }

    /**
     * 添加商品到购物车
     * @param {Object} cart
     */
    function add(cart){
        $.ajax({
            url: '/mycart/add',
            type: 'POST',
            data: JSON.stringify({carts: [cart]}),
            contentType: 'application/json',
            needMessage: true,
            showMessage: true,
            success: function (data, state, xhr){
                if(data.code === 200){
                    cookie.set('lastCartsUpdate', new Date*1, {expires: 1, path: '/'});
                }
            }
        });
    }

    /**
     * 删除购物车商品
     * @param {String} confirmStr 执行前提示确认
     * @param {Number} cartId 要删除的购物车商品 ID，可以传入多个 ID 参数
     */
    function del(confirmStr, cartId, callback){
        var carts = $.makeArray(cartId);
        confirmStr = confirmStr || '确定要删除该订单吗？';

        $.ajax({
            url: '/mycart/del',
            type: 'POST',
            data: JSON.stringify({carts: carts}),
            contentType: 'application/json',
            needLogin: true,
            showMessage: true,
            confirm: confirmStr,
            success: function (data, state, xhr){
                if(data.code === 200){
                    cookie.set('lastCartsUpdate', new Date*1, {expires: 1, path: '/'});
                    $.isFunction(callback) &&
                        callback(carts, data);
                }
            }
        });
    }

    function clean(){
        ;
    }

    var cartsUpdateCb = [],
        lastCartsProcess = -Infinity; // 上次处理购物车变更的时间
    /**
     * 添加购物车变更处理函数
     * @param  {Function} callback
     */
    function onupdate(callback){
        if($.isFunction(callback)){
            cartsUpdateCb.push(callback);
        }
    }
    /**
     * 监听购物车变更
     */
    function listenCarts(){
        // 上次购物车变更时间
        var lastCartsUpdate = parseInt(cookie.get('lastCartsUpdate'))||0,
            carts = {};

        // 比上次处理时间晚
        if(isLogin() && lastCartsUpdate > lastCartsProcess){
            $.get('/mycart/all').done(function (data){
                // 只要有返回数据就更新时间
                // 只有 200 状态才更新的话会持续发起多次请求
                lastCartsProcess = lastCartsUpdate;
                if(data.code === 200){
                    carts = data.data;
                    for(var i in cartsUpdateCb){
                        // 回调函数不可控
                        try{
                            cartsUpdateCb[i].call(carts, carts);
                        }catch(e){
                            console.log(e);
                        }
                    }
                }
            }).always(function (){
                setTimeout(listenCarts, TIME_STAMP);
            });
        }else{
            setTimeout(listenCarts, TIME_STAMP);
        }
    }

    function init(){
        listenCarts();
    }
    init();

    return {
        get: get,
        add: add,
        del: del,
        clean: clean,
        onupdate: onupdate
    }
 })

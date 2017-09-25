/**
 * 全局导航条
 * @update liuwencheng 14-4-14 添加登出功能, 添加rebind函数用于在异步登陆成功后重新绑定事件
 * @update liuwencheng 14-4-16 将top事件绑定放到./top-eventbind.js中
 */
 define(function(require, exports){
    var $ = require('jquery'),
        confirm = require('zz/ui/confirm'),
        alert = require('zz/ui/alert'),
        info = require('zz/ui/info'),
        Dialog = require('zz/ui/Dialog'),
        cartsManage = require('common/carts-manage');

    /**
     * 更新购物车信息
     * @param  {Array} carts 购物车商品
     */
    function updateCarts(carts){
        var $table = $('[data-label=carts]'), // 购物车表格
            $row = $('[data-label=cart]:first', $table), // 表格行模板
            totalPrice = 0, // 购物车商品总价
            isEmpty; // 购物车是否为空

        if(!$.isArray(carts))
            return;

        isEmpty = carts.length === 0;

        // 清空旧的数据
        $row.toggle(isEmpty).nextAll('[data-label=cart]').remove();

        // 购物车没有商品时不显示数量
        $('[data-label=cartsCount]')
            .text(carts.length)
            .toggle(!isEmpty);

        // 购物车没有商品时显示提示内容
        $('#mycart .mycart-table, #mycart .mycart-foot').toggle(!isEmpty);
        $('#mycart .empty').toggle(isEmpty);

        $.each(carts, function(i, cart){
            cart = $.extend({}, cart, {
                price: parseFloat(cart.price) || 0,
                amount: parseFloat(cart.amount) || 0,
                unit: cart.unit || '',
                subject: cart.subject || '',
                body: cart.body || ''
            });

            // 复制表格行并更新数据
            $row = $row.clone();
            $('[data-label=name]',   $row).text(cart.subject).attr('title', cart.subject);  // 商品名称
            $('[data-label=option]', $row).text(cart.body).attr('title', cart.body);   // 商品参数
            $('[data-label=number]', $row).text(cart.amount + cart.unit);  // 数量
            $('[data-label=price]',  $row).text(cart.price.toFixed(2)); // 金额
            $('[data-action=del]',   $row).attr('data-id', cart.id).show(); // 删除按钮
            $row.appendTo($table).show();

            // 计算总价
            totalPrice += parseFloat(cart.total_fee)||0;
        });

        // 更新购物车商品总价
        $('[data-label=cartsPrice]').text(totalPrice.toFixed(2));
    }

    /**
     * 购物车商品，删除按钮点击处理
     */
    $('[data-label=carts]').on('click', '[data-action=del]', function(){
        var id = $(this).data('id');

        // 模板行不处理
        if(!id){
            return;
        }

        cartsManage.del('', id);
    });


    function init(){
/*        var $globalTopNav = $('#globalTopNav')
            ,$popup = $('#nav-all').children('ul')
            ,navTop
            ,winScrollTop
        navTop = $globalTopNav.offset().top*/
        // $(window).scroll(function(){
        //     winScrollTop = $(window).scrollTop()
        //     if(winScrollTop >= navTop) {
        //         $globalTopNav.css({
        //             'position':'fixed',
        //             'left': 0,
        //             'top': 0,
        //             'zIndex': 100
        //         }).next().show()
        //         if($(document.body).attr('id') === 'page-home') {
        //             //$popup.hide()
        //             $(document.body).attr('id','page-home-none')
        //         }
        //     }else {
        //         $globalTopNav.css('position','static').next().hide()
        //         if($(document.body).attr('id') === 'page-home-none') {
        //             //$popup.show()
        //             $(document.body).attr('id','page-home')
        //         }
        //     }
        // })

        cartsManage.onupdate(updateCarts);

        // disableTempletLink();

        // $('#loginBtn').click(function(e){
        //     loginDialog();
        //     return false;
        // });
        //登陆的话绑定
        if(require('common/utils/utils').isLogin()) {
            require('./top-eventbind')()
        }
    }
    init();
 })

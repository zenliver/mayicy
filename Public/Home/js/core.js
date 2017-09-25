$(function () {
    //登录
    ajax_login();

    //确定取消订单
    $("[date-layer=confirm]").on("click", function () {
        var id = $(this).attr('rel');
        layerCofirm(id);
    })

    //固定头部
    //$("#header").capacityFixed();
});


function getAjaxPageData(url){
    $.ajax({
        type: "POST", url: url, data: "", success: function (data) {
            $('#advertiseComment').html(data);
        }
    });
}

//登录
function ajax_login() {
    $.ajax({
        type: "GET", url: "/Public/ajax/ajax_login.txt", data: "", success: function (data) {
            $('#ajax_login').html(data);
        }
    });
}

//登录
function layer_login() {
    $.ajax({
        type: "GET", url: "/Public/ajax/ajax_logins.txt", data: "", success: function (data) {
            if (data == 0) {
                layerLogin();
                return false;
            } else {

                // document.getElementById("ajax_cart").submit();  // 原正式代码，暂时注释掉

                // 此代码仅作为静态页面演示之用，若做后台须去掉
                window.location.href = "/Cart/index.shtml.htm";

            }
        }
    });
}

//方法-我要咨询
$("[date-layer=layerAnswer]").on("click", function () {
    var id = $(this).attr('lang');
    $.ajax({
        type: "POST", url: "/index.php/Home/Public/ajax_logins", data: "", success: function (data) {
            if (data == 0) {
                layerLogin();
                return false;
            } else {
                layer.open({
                    type: 2,
                    title: false,
                    closeBtn: true,
                    area: ['600px', '500px'],
                    closeBtn: 1,
                    offset: 'cc',
                    shift: 2,
                    content: ['/index.php/Home/Public/layer_answer.shtml?id='+id, 'no'], //iframe的url，no代表不显示滚动条
                    shade: [0.3],
                    shadeClose: false,
                    end: function () { //此处用于演示
                        //window.location.reload();
                        ajax_login();
                    }
                });
            }
        }
    });
});

//方法-登录
function layerLogin() {
    layer.open({
        type:2,
        title: "登录第一站创业",
        closeBtn: true,
        area: ['856px', '434px'],
        closeBtn: 1,
        offset: 'cc',
        shift: 2,
        content: ['/Public/ajax/layer_login.html', 'no'], //iframe的url，no代表不显示滚动条
        shade: [0.3],
        shadeClose: false,
        end: function () { //此处用于演示
            //window.location.reload();
            ajax_login();
        }
    });
}

//方法-注册
function layerSign() {
    layer.open({
        type:2,
        title: "快速注册第一站创业",
        closeBtn: true,
        area: ['1046px', '540px'],
        closeBtn: 1,
        offset: 'cc',
        shift: 2,
        content: ['/Public/ajax/layer_Sign.html', 'no'], //iframe的url，no代表不显示滚动条
        shade: [0.3],
        shadeClose: true
    });
}

//方法-取消订单
function layerCofirm(id) {
    layer.confirm('您确定要取消订单么？', {
        btn: ['确定', '取消'],
        title: '确认信息',
        area: ["400px", "auto"],
        shade: [0.6],
        shadeClose: false
    }, function () {
        $.ajax({
            type: "POST", url: "/index.php/Home/User/order_cancel", dataType: "json", data: "id="+id, success: function (data) {
                if (data['state'] > 0) {
                    layer.msg('订单已经取消', {icon: 1});
                    window.location.reload();
                } else {
                    layer.msg(data['msg'], {icon: 1});
                }
            }
        });

    }, function () {
        layer.msg('取消操作');
    });

}

// 方法-返回顶部
$(function(){
var $body = $(document.body);;
var $bottomTools = $('.toTop');
var $qrTools = $('.qr_tool');
var qrImg = $('.qr_img');
    $(window).scroll(function () {
        var scrollHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var $footerHeight = $('#footer').outerHeight(true);
        var $windowHeight = $(window).innerHeight();
        scrollTop > 50 ? $("#scrollUp").fadeIn(200).css("display","block") : $("#scrollUp").fadeOut(200);
        $bottomTools.css("bottom", scrollHeight - scrollTop - $footerHeight > $windowHeight ? 40 : $windowHeight + scrollTop + $footerHeight + 40 - scrollHeight);
    });
    $('#scrollUp').click(function (e) {
        e.preventDefault();
        $('html,body').animate({ scrollTop:0});
    });
    $qrTools.hover(function () {
        qrImg.fadeIn();
    }, function(){
         qrImg.fadeOut();
    });
});

// 在线咨询
$('#sideTile').on("click",function(){

    $("#sideCtn").toggle();
});

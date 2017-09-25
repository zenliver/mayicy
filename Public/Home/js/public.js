$(function(){
	//登录
	$("[date-layer=login]").on("click",function(){
		var mTop = $(this).position().top + 30;
		var mLeft = $(this).position().left - 270;
		layer.open({
			type: 2,
			title:"欢迎登录汉盟",
			closeBtn:true,
			area: ['370px', '360px'],
			closeBtn: 1,
			offset: 'cc',
			shift: 2,
			content: ['http://www.mayicy.cn/Public/Home/js/layer-login.html', 'no'], //iframe的url，no代表不显示滚动条
			shade:[0.3],
			shadeClose:true
		});

	});

	//余额提示
	$("[date-layer=comfrim]").on("click",function(){
		layer.confirm('<h2 style="color:#f50;marign-bottom:20px;">您的余额不足：</h2><p>您当前的余额为：<span>￥0.00元</span>，已选自媒体所需金额为：<span>￥0.00元</span></p>', {
		    btn: ['立即充值','暂不充值'], 
		    title:'提示',
		    shadeClose:true
		}, function(){
		    layer.msg('跳转充值页面');
		}, function(){
		    layer.msg('跳转用户中心-草稿箱');
		});
	});

	//广告详情
	$("[date-layer=peomo-detial]").on("click",function(){
		var promoCtn = $(this).attr("date-layer-ctn");
		var promoTitle = $(this).attr("date-layer-t");
		layer.open({
		    btn: ['关闭'], 
		    title:promoTitle,
		    shadeClose:true,
		    content:promoCtn
		}, function(){
		    layer.msg('跳转充值页面');
		}, function(){
		    layer.msg('跳转用户中心-草稿箱');
		});
	});

	//二维码
	$("[date-layer=ewm]").on("click",function(){
		var ewmUrl = $(this).attr("date-layer-ewm");
		layer.open({
		    title:'二维码',
		    area: ['370px', '360px'],
		    content:'<img src="'+ ewmUrl +'" width="100%" />',
		    shadeClose:true
		});
	});

	//表格单双行
	$("[date-table=odd] tbody tr:odd").addClass("table-odd");

})
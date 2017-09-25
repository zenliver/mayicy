$(function(){

	$("[date-tab=tab]").each(function(){

  		$("[date-tab=t]:eq(0)").addClass("tab-act").siblings().removeClass("tab-act");
		$(this).find("[date-tab=b]:eq(0)").show().siblings().hide();
		$("[date-tab=t]").on("click",function(){
            var is_lock = true;
            $(this).siblings().each(function(){
                if($(this).attr('data-check') == 't'){
                    is_lock = false;
                    return false;

                }
            });
            if(!is_lock){
                return false;
            }
			var tabIndex = $(this).index();
			$(this).addClass("tab-act").siblings().removeClass("tab-act");
			$(this).parents("[date-tab=tab]").find("[date-tab=b]:eq("+ tabIndex +")").show().siblings().hide();
		});

  	})

	//表格单双行
	$("[date-table=odd] tbody tr:odd").addClass("table-odd");

	//goods sc-i
	$(".goods-one").attr("lang",0);
	$(".sc-i").on("click",function(){
		var icon = '<i class="u-i i-right4"></i>';
		var getLang = 0 ;
		var goodsSum = new Array($(".goods-one").length-1);
		var sum = originalSum = 0;
		$(this).siblings(".sc-t").removeClass("sc-iact");
		$(this).siblings(".sc-h").addClass("sc-hact");
		$(this).addClass("sc-iact").append(icon).siblings(".sc-i").removeClass("sc-iact");
		$(this).siblings("[date-type=info]").val( $(this).attr("rel")  );
		$(this).parents(".goods-one").attr("lang",$(this).attr("lang")  );
		$(this).parents(".goods-one").attr("rel",$(this).attr("value")  );
		var relVluer=$(this).attr("rel");
		if(relVluer = 50){
			$("[date-type=infos]").val(0);
		};
		for(var i=1;i<$(".goods-one").length;++i){
			sum+= Number($(".goods-one:eq("+ i +")").attr("lang"));
            originalSum += Number($(".goods-one:eq("+ i +")").attr("rel"));
		}
        $("#original").html("￥" + originalSum);
		$(".price-change").html("￥" +sum);
	})
	$('.sc-t').click(function(){
		$(".goods-sa").addClass("goods-two");
		var icon = '<i class="u-i i-right4"></i>';
		$(this).addClass("sc-iact").append(icon).siblings(".sc-i").removeClass("sc-iact");
		$(".sc-h").removeClass("sc-hact");
		$(".sc-h:eq(0)").trigger("click");


		$(this).siblings("[date-type=infos]").val( $(this).attr("rel")  );
		$("#original").html("￥" + $(this).attr("lang"));
		$(".price-change").html("￥" +$(this).attr("value"));

	});
	$('.sc-i').click(function(){
		$(".sc-h").addClass("sc-hact");
		$(".goods-s").removeClass("goods-two");
	});
	//goods sc-i
	$(".goods-two").attr("lang",0);
	$(".sc-h").on("click",function(){
		var icon = '<i class="u-i i-right4"></i>';
		var getLang = 0 ;
		var goodsSum = new Array($(".goods-two").length-1);
		var sum = originalSum = 0;
		$(this).siblings(".sc-t").removeClass("sc-iact");
		$(this).addClass("sc-iact").append(icon).siblings(".sc-h").removeClass("sc-iact");
		$(this).siblings("[date-type=infos]").val( $(this).attr("rel")  );
		$(this).parents(".goods-two").attr("lang",$(this).attr("lang")  );
		$(this).parents(".goods-two").attr("rel",$(this).attr("value")  );
		for(var i=1;i<$(".goods-two").length;++i){
			sum+= Number($(".goods-two:eq("+ i +")").attr("lang"));
            originalSum += Number($(".goods-two:eq("+ i +")").attr("rel"));
		}
        $("#original").html("￥" + originalSum);
		$(".price-change").html("￥" +sum);
	})
});

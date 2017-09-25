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
	$(".goods-s").attr("lang",0);
	$(".sc-i").on("click",function(){

		var icon = '<i class="u-i i-right4"></i>';
		var getLang = 0 ;
		var goodsSum = new Array($(".goods-s").length-1);
		var sum = originalSum = 0;

		$(this).addClass("sc-iact").append(icon).siblings(".sc-i").removeClass("sc-iact");
		$(this).siblings("[date-type=info]").val( $(this).attr("rel")  );
		$(this).parents(".goods-s").attr("lang",$(this).attr("lang")  );
		$(this).parents(".goods-s").attr("rel",$(this).attr("value")  );
		for(var i=1;i<$(".goods-s").length;i++){
			sum+= Number($(".goods-s:eq("+ i +")").attr("lang"));
            originalSum += Number($(".goods-s:eq("+ i +")").attr("rel"));
		}
        $("#original").html("￥" + originalSum);
		$(".price-change").html("￥" +sum);
	})



})
require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3"
	}
})
require(["loadcartlist","readCart"],function(a,Cookie){
	$("nav").on("mouseenter",".classification",function(){
		$(".drop-nav-item").stop().slideDown()
	}).on("mouseleave",".classification",function(){
		$(".drop-nav-item").stop().slideUp();
	})
	var cookie = new Cookie();
	var cookieArr = cookie.goods("goods");
	$.ajax({
		url:"lib/goodslist.json"
	})
	.then(function(res){
		// var goods = JSON.parse(res);
		var goods = res;
		var listArr = [];
		for( var i = 0 ; i<cookieArr.length ; i++ ){
			for(var j = 0 ; j<goods.length ; j++){
				if( cookieArr[i].id == goods[j].id ){
					listArr.push(goods[j]);
				}
			}
		}
		var carlist = ""
		for( var i = 0 ; i<listArr.length ; i++ ){
			var item = listArr[i];
			carlist+='<li class="list-item" data-id="'+item.id+'">'+
							'<ul class="clear">'+
								'<li class="tab-50 selectbox">'+
									'<input type="checkbox" checked data-id="'+item.id+'">'+
								'</li>'+
								'<li class="tab-400 clear">'+
									'<div class="cartimg pull-left">'+
										'<a href="#"><img src="'+item.showimg+'" alt=""></a>'+
									'</div>'+
									'<div class="contentbox">'+
										'<p><a href="#">'+item.name+'</a></p>'+
										'<p>  '+item.intro+'</p>'+
										'<p><span class="label">'+item.mode[0].pattern+'</span></p>'+
									'</div>'+
								'</li>'+
								'<li class="tab-80 untilPrice">'+item.mode[0].price+'</li>'+
								'<li class="tab-100 payfor">'+item.deposit+'</li>'+
								'<li class="tab-100">'+
									'<div class="numbox clear" data-id="'+item.id+'">'+
										'<i class="pull-left btnleft">-</i>'+
										'<i class="pull-right btnright">+</i>'+
										'<span>'+cookieArr[i].num+'</span>'+
									'</div>'+
								'</li>'+
								'<li class="tab-100">'+
									'2017-9-28'+
								'</li>'+
								'<li class="tab-80">'+item.mode[0].time+'</li>'+
								'<li class="tab-100 text-red">'+cookieArr[i].num*item.mode[0].price+'</li>'+
								'<li class="tab-80">'+
									'<span class="del" data-id="'+item.id+'">删除</span>'+
								'</li>'+
							'</ul>'+
						'</li>'
		}
		if( carlist != "" ){
			$(".panel-body ul").html(carlist);
		}
		var countPrice = 0;
		$(".panel-body>ul").find(".text-red").each(function(){
			countPrice += parseInt($(this).html());
		})
		$(".count .price").html(countPrice);
		$(".panel-body>ul").on("click",".btnright",function(){
			var currentNum = parseInt($(this).siblings("span").html());
			var price = $(this).parent().parent().siblings(".untilPrice").html();
			currentNum++;
			$(this).siblings("span").html(currentNum);
			$(this).parent().parent().siblings(".text-red").html(currentNum*price);
			var countPrice = 0;
			$(".panel-body>ul").find(".text-red").each(function(){
				countPrice += parseInt($(this).html());
			})
			$(".count .price").html(countPrice);
			cookie.goods({
				key:"goods",
				value:{"id":$(this).parentsUntil(".list-item").attr("data-id"),"num":currentNum}
			})
			
		})
		$(".panel-body>ul").on("click",".btnleft",function(){
			var currentNum = parseInt($(this).siblings("span").html());
			if( currentNum<=1 ){
				return;
			}
			var price = $(this).parent().parent().siblings(".untilPrice").html();
			currentNum--;
			$(this).siblings("span").html(currentNum);
			$(this).parent().parent().siblings(".text-red").html(currentNum*price);
			var countPrice = 0;
			$(".panel-body>ul").find(".text-red").each(function(){
				countPrice += parseInt($(this).html());
			})
			$(".count .price").html(countPrice);
			cookie.goods({
				key:"goods",
				value:{"id":$(this).parent().attr("data-id"),"num":$(this).siblings("span").html()},
				add:false
			})
		})
		$(".panel-body>ul").on("click",".del",function(){
			$(this).parent().parent().parent().remove();
			var countPrice = 0;
			$(".panel-body>ul").find(".text-red").each(function(){
				countPrice += parseInt($(this).html());
			})
			var allNum = 0;
			$(".panel-body input").each(function(){
				if( $(this).prop("checked") ){
					allNum++;
				}
			})
			$(".allNum").html(allNum);
			$(".count .price").html(countPrice);
			cookie.goods({
				key:"goods",
				value:{"id":$(this).attr("data-id")},
				del:true
			})
		})
		$(".del_some").on("click",function(event){
			var evt = event || window.event;
			$(".panel-body input").each(function(){
				if($(this).prop("checked")){
					$(this).parent().parent().parent().remove();
					var countPrice = 0;
					$(".panel-body>ul").find(".text-red").each(function(){
						countPrice += parseInt($(this).html());
					})
					$(".count .price").html(countPrice);
					cookie.goods({
						key:"goods",
						value:{"id":$(this).attr("data-id")},
						del:true
					})
				}
			})
			evt.preventDefault ? evt.preventDefault() : evt.returnValue=false;
		})
		$(".del_some").siblings("input").on("change",function(){
			var currentStatus = $(this).prop("checked");
			$(".panel-body input").each(function(){
				$(this).prop("checked",currentStatus);
			})
			var allNum = 0;
			$(".panel-body input").each(function(){
				if( $(this).prop("checked") ){
					allNum++;
				}
			})
			$(".allNum").html(allNum);
		})
		$(".del-all").on("click",function(){
			if( $(".del_some").siblings("input").prop("checked") ){
				
			}else{
				$(".del_some").siblings("input").trigger("change");
			}
			$(".del_some").trigger("click");
			var allNum = 0;
			$(".panel-body input").each(function(){
				if( $(this).prop("checked") ){
					allNum++;
				}
			})
			$(".allNum").html(allNum);
		})
		$(".panel-body input").on("change",function(){
			var isChecked = true;
			var allNum = 0;
			$(".panel-body input").each(function(){
				isChecked = isChecked && $(this).prop("checked");
				if( $(this).prop("checked") ){
					allNum++;
				}
			})
			$(".allNum").html(allNum);
			$(".del_some").siblings("input").prop("checked",isChecked);
		})
		var allNum = 0;
		$(".panel-body input").each(function(){
			if( $(this).prop("checked") ){
				allNum++;
			}
		})
		$(".allNum").html(allNum);
	})
	
	
})
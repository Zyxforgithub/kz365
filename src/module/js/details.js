require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3"
	}
})
require(["loaddetails","banner","tab","magnifier"],function(a,banner,Tab,Magnifier){
	$("nav").on("mouseenter",".classification",function(){
		$(this).children(".drop-nav-item").stop().slideDown();
	}).on("mouseleave",".classification",function(){
		$(this).children(".drop-nav-item").stop().slideUp();
	})
	var idArr = location.href.split("?")[1].split("=");
	$.ajax({
		url:"../lib/goodslist.json"
	})
	.then(function(res){
		for( var i= 0 ; i<res.length ; i++ ){
			if( res[i][idArr[0]] == idArr[1] ){
				var goods = res[i];
				break;
			}
		}
// 面包屑导航 商品名称添加
		$(".current_title").html(goods.name);
// 商品名称添加
		$(".goodstitle").html(goods.name);
// 商品 简介 添加
		$(".goodspro").html(goods.intro);
// 商品 单价 添加
		$(".goodsUnitPrice .price").html(goods.mode[0].price);
//租赁方式拼接
		var modeStr = ""
		for(var i = 0 ; i<goods.mode.length ; i++){
			modeStr+='<dd class="select">'+
								'<p>租金：<span class="price">'+goods.mode[i].price+'</span></p>'+
								'<p>租期：<span >'+goods.mode[i].time+'</span>月</p>'+
								'<p class="text-center"><span></span>'+goods.mode[i].pattern+'</p>'+
							'</dd>'
		}
		$(".timeChoice").html(modeStr);
// 商品押金添加
		$(".payMuch .price1").html(goods.deposit);
		$(".payMuch .price2").html(goods.deposit);
		$(".monthprice .price").html(goods.mode[0].price)
// 商品 小图添加
		$(".small-box img").attr("src",goods.smimg[0]);
// 商品 小图展示添加
		var selImg = "";
		for( var i = 0 ; i<goods.smimg.length ; i++ ){
			selImg+='<li><img src="'+goods.smimg[i]+'" alt=""></li>'
		}
		// selImg+=selImg;
		$(".select_imgbox ul").html(selImg);
// 商品 数量更改按钮添加事件
		$(".numChoice .btn").on("click",function(){
			var num = parseInt($(".numbox").html());
			console.log($(this));
			if($(this).hasClass("leftbtn")){
				num = num<=1 ? 1 : --num;
			}else{
				num = ++num;
			}
			$(".numbox").html(num);
			$(".payMuch .price2").html(goods.deposit*num);
			$(".monthprice .price").html(goods.mode[0].price*num);
		})
// 商品小图 左右滚动焦点图
		new banner().init({
			btn:$(".select-img .btn"),
			effect:"gundong",
			list:$(".select-img .select_imgbox ul").children(),
			maxNum:4
		})
// 商品 相关商品 滚动焦点图
		new banner().init({
			btn:$(".parts-list i"),
			effect:"gundong",
			list:$(".goodswrap ul").children(),
			maxNum:3
		})
// 相关详情添加 选项卡
		new Tab($(".detail-info")).init();
// 点击选项卡 回到title顶部
		$(".tab-title").on("click","li",function(){
			$("html,body").animate({
				scrollTop:$(".detail-info").offset().top-10
			},600)
		})
// 商品详情页面图片添加
		var detaImg = "";
		for(var i = 0 ; i<goods.detailimg.length ; i++){
			detaImg+='<img src="'+goods.detailimg[i]+'" alt="">';
		}
		$(".detail-info-one").html(detaImg);
// 商品 配置信息添加
		$(".detail-info-two").find("img").attr("src",goods.parameterimg);
// 给加入购物车按钮添加 data-id 属性;
		$(".addCar").attr("data-id",goods.id);
// 参数列表 头部吸顶效果添加
		$(window).scroll(function(){
			if($(document).scrollTop()>=$(".detail-info").offset().top){
				$(".detail-title").addClass("fixAuto");
				$(".detail-title").find(".addCar").removeClass("hide");
				$(".detail-title .detail-ad-title").find(".lx").removeClass("hide").siblings().addClass("hide");
			}else{
				console.log(2);
				$(".detail-title").removeClass("fixAuto");
				$(".detail-title").find(".addCar").addClass("hide");
				$(".detail-title .detail-ad-title").find(".tj").removeClass("hide").siblings().addClass("hide");
			}
		})
//  相关商品部分 该商品信息加载
  		$(".left-goods .imgwrap img").attr("src",goods.showimg);
	  	$(".left-goods .contentwrap .goods-pro").html(goods.name);
	  	$(".left-goods .contentwrap .price").html(goods.mode[0].price);
	  	$(".right-goods .price").html(goods.mode[0].price);
//  相关商品选择，更改套餐价
		var countPrice = parseInt(goods.mode[0].price);
		$(".goodswrap input").on("change",function(){
			if( $(this).prop("checked") ){
				countPrice += parseInt($(this).siblings(".price").html());
	  			$(".right-goods .price").html(countPrice);
			}else{
				countPrice -= parseInt($(this).siblings(".price").html());
	  			$(".right-goods .price").html(countPrice);
			}	
		})
// 放大镜 处理
		$(".lg-box img").attr("src",goods.bgimg[0]);
		new Magnifier({
			mask:$(".goods-show-img .cover"),
			opos:$(".goods-show-img .mask"),
			obox:$(".goods-show-img .lg-box"),
			obimg:$(".goods-show-img .lg-box img")
		})
	
// 放大镜位置图片切换
		$(".select-img .select_imgbox").on("click","li",function(){
			$(this).index()
			$(".goods-show-img .lg-box img").attr("src",goods.bgimg[$(this).index()]);
			$(".goods-show-img .small-box img").attr("src",goods.smimg[$(this).index()]);
		})
	})	
})
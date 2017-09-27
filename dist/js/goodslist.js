require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3"
	}
})
require(["loadgoodslist","paging"],function(a,Paging){
	$("nav").on("mouseenter",".classification",function(){
		$(".drop-nav-item").stop().slideDown();
	})
	$("nav").on("mouseleave",".classification",function(){
		$(".drop-nav-item").stop().slideUp();
	})
	var page = new Paging(".goodslist-box");
	page.init({
		url:"../lib/goodslist.json"
	})
	var keyWord = {};
	$(".goods-sort").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(".goods-sort ul").children(".active").index();
		page.filterData(index,keyWord);
	})
	$(".filter_inner").on("click","dd",function(){
		var na = $(this).parent().attr("data-name");
		$(this).addClass("active").siblings().removeClass("active");
		if( na ){
			keyWord[na] = $(this).html();
			console.log(na);
			$("#hasSel").children("span[data-name="+na+"]").remove();
			$("#hasSel").append("<span data-name="+na+">"+$(this).html()+"<i>x</i></span>");
		}
		$(".goods-sort li:eq(0)").trigger("click");
	})
	$("#hasSel").on("click","i",function(){
		delete keyWord[$(this).parent().attr("data-name")];
		$(this).parent().remove();
		$(".goods-sort li:eq(0)").trigger("click");
	})
})
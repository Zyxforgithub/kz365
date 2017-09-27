require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3",
	}
})
require(["loadindex","banner","louti","readCart"],function(loadsource,banner,louti,Cookie){
	var selectbtns = $("#selectbtns").children();
	var imgs = $("#imgbox").children();
	var outbox = $("#banner");
	new banner().init({
		list:imgs,
		mark:selectbtns,
		isPlay:true,
		outbox:outbox
	})
	new banner().init({
		btn:$("#hot_btn").children(),
		effect:"gundong",
		list:$("#hot_img").children()
	})
	new louti().init({
		div:$(".title"),
		figer:$("#sidenav").children()
	})
	$(".rightbar li:last").on("click",function(){
		$("html,body").animate({
			scrollTop:0
		},500)
	})
	$("#toCart").on("click",function(){
		location.href = "cartlist.html";
	})
	var cookie = new Cookie();
	$("#showNum").html(cookie.goods("goods","num"))
})
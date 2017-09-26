define(["jquery"],function(){
	$("header").load("html/common.html .header-top");
	$("section").eq(0).load("html/common.html .searchbox");
	$("nav").load("html/common.html .nav");
	$("footer").load("html/common.html .footer_top,.footer_bottom");
})
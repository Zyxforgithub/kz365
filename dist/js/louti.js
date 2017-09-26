define(["jquery"],function($){
	class Louti{
		constructor(){

		}
		init(obj){
			this.Div = obj.div;    // 传入楼层
			this.figer = obj.figer;	// 传入楼层显示
			var that = this;
			this.figer.on("click",function(){
				$("html,body").stop().animate({
					scrollTop:that.Div.eq($(this).index()).offset().top
				},500)
			})
			$(window).scroll(function(){
				if($(document).scrollTop()>=that.Div.eq(0).offset().top-200){
					that.figer.parent().stop().fadeIn("fast");
				}else{
					that.figer.parent().hide("fast");
				}
				that.Div.each(function(i){
					if( Math.abs($(document).scrollTop()-$(this).offset().top)<50 ){
						that.figer.eq(i).addClass("active").siblings().removeClass("active");
					}
				})
			})
		}
	}
	return Louti;
})
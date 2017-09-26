define(["jquery"] , function($) {
    class Banner {
        constructor(){

        }
        init(ele){
            this.btn = ele.btn;      //按钮json key:value   left right
            this.list = ele.list;    // 图片对象
            this.mark = ele.mark;    // 小圆点对象
            this.isPlay = ele.isPlay;//是否开启 自动轮播
            this.outbox = ele.outbox;// 父级盒子
            this.effect = ele.effect || "fade"; // 默认动画样式 淡入淡出
            this.maxNum = ele.maxNum || 5;      // 单页显示个数
            this.index = 0;
            var _this = this;
            if(this.effect == "fade"){
              this.step = this.list.length - 1;
            }else{
              this.step = this.list.length-this.maxNum;  //
            }
            if(this.btn != undefined){
              this.btn.on("click",function(){
                if($(this).hasClass("btn_left")){
                  _this.change("left");
                }else{
                  _this.change("right")
                }
              })
            }
            if( this.mark != undefined ){
              this.mark.on("click",function(){
                _this.index = $(this).index();
                _this.anima()
              })
            }
            
            if(this.isPlay != undefined && this.outbox != undefined){
              this.autoPlay();
              this.outbox.hover(function(){
                _this.isPlay = false;
                _this.autoPlay()
              },function(){
                _this.isPlay = true;
                _this.autoPlay();
              })
            }
            
        }
        change(direction){
          if(direction == "left"){
            if(this.index==0){
              this.index = this.step;
            }else{
              this.index--;
            }
          }
          if(direction == "right"){
            if(this.index == this.step){
              this.index= 0;
            }else{
              this.index++;
            }
          }
          this.anima();
        }
        anima(){
          if( this.effect=="fade" ){
            this.mark.eq(this.index).addClass("active").siblings().removeClass("active");
            this.list.eq(this.index).stop().fadeIn().siblings().stop().fadeOut();
          }
          if( this.effect=="gundong" ){
            this.list.parent().stop().animate({
              marginLeft:-this.index*this.list.eq(0).outerWidth()+"px"
            })
          }
        }
        autoPlay(){
          var _this = this;
          if(this.isPlay){
            this.timer = setInterval(function(){
              _this.change("right");
            },2000)
          }else{
            clearInterval(this.timer);
          }
        }
    }   

    return Banner;
})

define(["jquery"],function(){
	function Magnifier(obj){
		this.mask = obj.mask;
		this.opos = obj.opos;
		this.obox = obj.obox;
		this.obimg = obj.obimg;
		this.init();
	}
	Magnifier.prototype = {
		init : function(){
			var that = this;
			this.opos.css({
				"width":this.mask.width()*this.mask.width()/this.obimg.width(),
				"height":this.mask.height()*this.mask.height()/this.obimg.height()
			})
			
			this.mask.mouseenter(function(){
				that.opos.show();
				that.obox.show();
			})
			this.mask.mouseleave(function(){
				that.opos.hide();
				that.obox.hide();
			})
			this.mask.mousemove(function(event){
				var evt = event || window.event;
				that.move(evt);
			})
		},
		move : function(evt){
			var x = evt.offsetX - this.opos.width() / 2;
			var y = evt.offsetY - this.opos.height() / 2;
			var maxLeft = this.mask.width() - this.opos.width();
			var maxTop = this.mask.height() - this.opos.height();
			x = x <= 0 ? 0 : x>=maxLeft ? maxLeft : x;
			y = y <= 0 ? 0 : y>=maxTop ? maxTop : y;
			this.opos.css({
				left:x,
				top:y
			})
			this.obimg.css("position","absolute");
			this.obimg.css({
				left:-x*this.mask.width()/this.opos.width(),
				top:-y*this.mask.height()/this.opos.height()
			})
		}
	}
	return Magnifier;
})
define(["jquery"],function(){
	function Tab(obj){
		this.tab = $(obj);
		this.tabBtn = this.tab.find(".tab-title").children();
		this.tabPanel = this.tab.find(".tab-panel").children();
		this.config={
			effect:"fade",
			cname:"active"
		}
	}
	$.extend(Tab.prototype,{
		init:function(opt){
			var that = this;
			$.extend(this.config,opt);
			this.tabBtn.on("click",function(){
				that.index = $(this).index();
				that.changePanel()
			})
		},
		changePanel:function(){
			this.tabBtn.eq(this.index).addClass(this.config.cname).siblings().removeClass(this.config.cname);
			if( this.config.effect == "fade" ){
				this.tabPanel.eq(this.index).stop().fadeIn().siblings().stop().fadeOut();
			}
			
		}
	})
	return Tab;
})
define(["jquery"],function(){
	function Paging(paging){
		if( Paging.obj ){
			return paging.obj;
		}
		this.pag = $(paging);
		this.list = this.pag.children(".goodslist-panel");
		this.index = this.pag.children(".goodslist-finger");
		this.config={
			url:"",
			itemNum:4,
			sidepage:1,
			fingerNum :1,
			pageMax:7
		};
		Paging.obj = this;
	}
	$.extend(Paging.prototype,{
		init:function(opt){
			var that = this;
			$.extend(this.config,opt);
			this.load();
			this.list.on("click","li",function(){
				console.log($(this).attr("data-id"));
				location.href="details.html?id="+$(this).attr("data-id");
			})
			this.index.on("click","li",function(){
				if( that.currentPage == $(this).index() ){
					return;
				}
				that.currentPage = $(this).index();
				that.changepanel()
			})
		},
		load:function(){ 		// 数据加载
			var that = this;
			$.ajax({
				url:this.config.url
			})
			.then(function(res){
				that.res = typeof res == "object" ? res : "";
				that.sortArr = JSON.parse(JSON.stringify(that.res));
				that.paging();
			})
		},
		paging:function(){	  //  根据
			this.pageNum = Math.ceil(this.sortArr.length / this.config.itemNum);
			this.currentPage = this.config.fingerNum - 1;
			this.isload = true;
			this.rendering();
		},
		rendering:function(){	// 根据this.sortArr对页面进行渲染
			if( this.sortArr.length == 0 ){
				var str = '<p class="no-data">暂无数据！</p>'
				this.list.html(str);
			}
			var html = ""
			for( var i = this.currentPage*this.config.itemNum ; i<(this.currentPage+1)*this.config.itemNum ; i++ ){
				if(i>=this.sortArr.length){
					break;
				}
				var item = this.sortArr[i];
				html+='<li data-id='+item.id+'>'+
							'<div class="imgbox">'+
								'<a href="#"><img src="'+item.showimg+'" alt=""></a>'+
								'<div class="flash-light"></div>'+
							'</div>'+
							'<div class="contentbox">'+
								'<p>'+item.name+'</p>'+
								'<p>'+item.intro+'</p>'+
								'<p>'+
									'<span class="price">'+item.mode[0].price+'</span>'+
								'</p>'+
							'</div>'+
						'</li>'
			}
			this.list.html(html);
			if(this.isload){
				var fingerHtml = ""
				if( this.pageNum>1 ){
					for( var i=0; i<this.pageNum ; i++ ){
						fingerHtml += "<li>"+(i+1)+"</li>";
					}
					this.index.html(fingerHtml);
					this.index.children().eq(this.currentPage).addClass("active");
				}else{
					this.index.html(fingerHtml);
				}
				this.isload = false;
			}
		},
		changepanel:function(){  // 通过下标更换页面
			this.index.children("li").eq(this.currentPage).addClass("active").siblings().removeClass("active");
			$("html,body").animate({
				scrollTop:this.pag.offset().top-100
			},400)
			this.rendering();
		},
		sortPrice:function(flag){   // 根据价格改变商品排列顺序
			// console.log(this.sortArr);
			if( flag == 0 ){
				this.paging();
				return;
			}
			var arr = [];
			var min = null;
			for( var i = 0 ; i<this.sortArr.length ; i++ ){
				min = i;
				for( var j=i+1 ; j<this.sortArr.length ; j++ ){
					if( parseInt(this.sortArr[min].mode[0].price)>=parseInt(this.sortArr[j].mode[0].price) ){
						min = j;
					}
				}
				arr.push(this.sortArr[min]);
				this.sortArr.splice(min,1);
				i=-1;
			}
			this.sortArr = null;
			if( flag == 1 ){
				this.sortArr = arr;
			}
			if( flag == 2 ){
				this.sortArr = arr.reverse();
			}
			arr = null;
			this.currentPage = 0;
			this.paging();
		},
		filterData:function(flag,opt){    // 根据传入的关键字 对数据进行筛选
			this.sortArr = JSON.parse(JSON.stringify(this.res));
			if( JSON.stringify(opt) =="{}" ){
				this.sortPrice(flag)
				return ;
			}
			var arr = [];
			var _flag = true;
			for( var i = 0 ; i<this.sortArr.length ; i++ ){
				_flag = true;
				for( var j in opt ){
					if( opt[j] == undefined ){
						continue;
					}
					if( opt[j]!=this.sortArr[i][j] ){
						_flag = false;
						break;
					}
				}
				if( _flag ){
					arr.push(this.sortArr[i]);
				}
			}
			this.sortArr = null;
			this.sortArr = arr;
			arr = null;
			this.sortPrice(flag);
		}
	})
	return Paging;
})
define(["jquery"],function(){
	$.cookie = function(opt){
		var option={
			key:"",
			value:"",
			path:"",
			exp:""
		};
		if(typeof opt == "object" && opt != null && JSON.stringify(opt) != "{}"){
			$.extend(option,opt);
			var d = new Date();
			if( option.exp != "" && Number(option.exp) ){
				d.setDate( d.getDate() + option.exp );
			}else{
				option.exp = "";
			}
			document.cookie = option.key+"="+option.value+";path="+option.path+";expires="+d;
		}
		if( typeof opt == "string" ){
			option.key = opt;
			var sCookie = document.cookie;
			var aCookie = sCookie.split("; ");
			for( var i = 0 ; i<aCookie.length ; i++ ){
				var aItems = aCookie[i].split("=");
				if( aItems[0] == option.key ){
					return aItems[1];
				}
			}
			return "";
		}
	}
	function CookieControl(){
		
	}
	$.extend(CookieControl.prototype,{
		getCookie : function(opt){
			// return eval($.cookie(opt)) || "";
			// return JSON.parse($.cookie(opt)) || "";
			if( $.cookie(opt) != "" ){
				return JSON.parse($.cookie(opt));
			}else{
				return "";
			}
		},
		count : function(opt,kword){
			if(typeof opt == "object" && opt != null && JSON.stringify(opt) != "{}"){
				var countArr = this.getCookie(opt.key);
				var isExtend = false;
				if( countArr instanceof Array && countArr.length != 0 ){
					for( var i = 0 ; i<countArr.length ; i++ ){
						if( countArr[i].user = opt.value.user ){
							isExtend = true;
							break;
						}
					}
					if(isExtend){
						countArr[i].pass = opt.value.pass;
					}else{
						countArr.push(opt.value)
					}
					this.saveCookie(opt.key,opt.value)
					return ;
				}
				
				if( !(countArr instanceof Array) && countArr != "" ){
					var arr = [];
					arr.push( countArr,opt.value );
					countArr = arr;
					arr = null;
					this.saveCookie(opt.key,countArr);
					return;
				}
				if( countArr == "" ){
					var arr = [];
					arr.push( opt.value );
					countArr = arr;
					arr = null;
					this.saveCookie(opt.key,countArr);
					return;
				}
			}
			if(  typeof opt == "string" && kword ){
				var countArr = this.getCookie(opt);
				if( countArr instanceof Array && countArr.length != 0 ){
					for( var i=0 ; i<countArr.length ; i++ ){
						if( countArr[i].user == kword ){
							break;
						}
					}
					return countArr[i].pass;
				}
			}
			if( typeof opt == "string" && kword == undefined ){
				var countArr = this.getCookie(opt);
				return countArr;
			}

		},
		goods : function(opt,kword){
			if(typeof opt == "object" && opt != null && JSON.stringify(opt) != "{}"){
				var goodsArr = this.getCookie(opt.key);
				var isExtend = false;
				if( goodsArr instanceof Array && goodsArr.length != 0){
					for( var i=0 ; i<goodsArr.length ; i++ ){
						if( goodsArr[i].id == opt.value.id ){
							isExtend = true;
							break;
						}
					}
					if( isExtend ){
						if( opt.add ){
							goodsArr[i].num = parseInt(goodsArr[i].num)+parseInt(opt.value.num);
						}else{
							goodsArr[i].num = opt.value.num;
							
						}
						if( opt.del ){
							goodsArr.splice(i,1);
						}
						
					}else{
						goodsArr.push( opt.value )
					}
					this.saveCookie(opt.key,goodsArr);
					return;
				}
				if( !(goodsArr instanceof Array) && goodsArr != "" ){
					var arr = [];
					arr.push(goodsArr,opt.value);
					goodsArr = arr;
					arr = null;
					this.saveCookie(opt.key,goodsArr);
					return;
				}
				if( goodsArr == "" ){
					var arr = [];
					arr.push( opt.value );
					goodsArr = arr;
					arr = null;
					this.saveCookie(opt.key,goodsArr);
					return;
				}
			}
			if(  typeof opt == "string" && kword == "num"  ){
				var goodsArr = this.getCookie(opt);
				var allNum = 0;
				if( goodsArr instanceof Array && goodsArr.length != 0 ){
					for( var i=0 ; i<goodsArr.length ; i++ ){
						allNum += parseInt(goodsArr[i].num);
					}
				}else{
					allNum = goodsArr.num || 0;
				}
				return allNum;
			}
			if( typeof opt == "string" && kword == undefined ){
				var goodsArr = this.getCookie(opt);
				return goodsArr;
			}
		},
		saveCookie : function(a,b){
			b = JSON.stringify(b);
			$.cookie({
				key:a,
				value:b
			})
		}
	})
	return CookieControl;
})
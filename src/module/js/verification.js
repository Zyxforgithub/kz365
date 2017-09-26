define(["jquery"],function(){
	$.fn.verification = function(opt,fn){
		var option={};
		var obj = {};
		for( var i in opt ){
			option[i] = opt[i];
			obj[i] = false;
		}
		/*option.tip = opt.tip;		// 提示框
		option.user = opt.user;		//用户名
		option.pwd = opt.pwd;		// 密码
		option.rpwd = opt.rpwd;		//密码确认
		option.codebox = opt.codebox;// 点击更换
		option.code = opt.code;		//验证码输入框
		option.phone = opt.phone 	// 电话号码
		option.btn = opt.btn;		// 点击注册按钮
		*/
		obj.btn = true;
		obj.tip = true;
		obj.codebox = true;
		var public = {};
		// 用户名检测
		if( option.user != undefined ){
			option.user.blur(function(){
				var reg = /^[a-zA-Z]{6,20}$/g;
				var str = this.value;
				if( reg.test(str) ){
					option.tip.html("");
					obj.user = true;
				}else{
					option.tip.html('长度为6~20位的英文字母');
					obj.user = false;
					option.tip.slideDown()
					clearTimeout(public.timer)
					public.timer = setTimeout(function(){
						option.tip.slideUp()
					},1000)
				}
			})
		}
		// 密码检测
		if( option.pwd != undefined ){
			option.pwd.blur(function(){
				var reg = /^.{3,}$/g
				var str = $(this).val();
				if( reg.test(str) ){
					option.tip.html("");
					obj.pwd = true;
				}else{
					option.tip.html('至少三位密码');
					obj.pwd = false;
					option.tip.slideDown()
					clearTimeout(public.timer)
					public.timer = setTimeout(function(){
						option.tip.slideUp()
					},1000)
				}
			})
		}
		//密码确认
		if( option.rpwd != undefined ){
			option.rpwd.blur(function(){
				if( $(this).val() != option.pwd.val() ){
					option.tip.slideDown();
					option.tip.html('两次密码不一致');
					clearTimeout(public.timer)
					public.timer = setTimeout(function(){
						option.tip.slideUp()
					},1000)
					obj.rpwd = false;
				}else{
					if( option.pwd.val() != "" ){
						option.tip.html("");
						obj.rpwd = true;
					}
					
				}
			})
		}
		// 验证码功能测试
		if( option.codebox != undefined && option.code != undefined ){
			option.codebox.click(function(){
				public.codeStr = public.randomCode();
				option.codebox.html(public.codeStr);
			})
			option.code.blur(function(){
				if( $(this).val() != public.codeStr ){
					option.tip.html("输入验证码有误");
					obj.code = false;
					option.tip.slideDown()
					clearTimeout(public.timer)
					public.timer = setTimeout(function(){
						option.tip.slideUp()
					},1000)
				}else{
					option.tip.html("");
					obj.code = true;
				}
			})
		}
		if( option.phone != undefined ){
			option.phone.blur(function(){
				var reg = /^1[34578]\d{9}$/;
				var phone = $(this).val();
				if( reg.test(phone)){
					option.tip.html("");
					obj.phone = true;
				}else{
					option.tip.slideDown();
					option.tip.html("请输入正确的手机号码");
					obj.phone = false;
					clearTimeout(public.timer)
					public.timer = setTimeout(function(){
						option.tip.slideUp()
					},1000)
				}
			})
		}
		// 提交检测
		if( option.btn != undefined ){
			option.btn.click(function(){
				for( var i in obj ){
					if( obj[i]==false ){
						option.tip.html('请填写完整');
						obj.pwd = false;
						option.tip.slideDown()
						clearTimeout(public.timer)
						public.timer = setTimeout(function(){
							option.tip.slideUp()
						},1000)
						return;
					}
				}
				if(fn){
					fn();
				}
			})
		}
		public.randomCode = function(){
			var str = '0123456789abcdefghijklmnopqistuvwxyz';
			var code = '';
			for( var i = 0 ; i<4 ; i++ ){
				var randomNum = Math.round( Math.random() * (str.length - 1) );
				code += str[randomNum];
			}
			return code;
		}

	}
})
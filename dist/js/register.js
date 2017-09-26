require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3"
	}
})
require(["loadregister","verification"],function(){
	$("form").verification({
		phone:$("#phone"),
		tip:$("#tip"),
		code:$("#confirm"),
		codebox:$("#codebox"),
		pwd:$("#password"),
		rpwd:$("#repwd"),
		btn:$("#tijiao")
	},function(){
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"POST",
			data:{
				status:"register",
				userID:$("#phone").val(),
				password:$("#password").val()
			}
		})
		.then(function(res){
			switch(res){
				case "0" :console.log("用户名重名");
						clearTimeout($("#tip").timer);
						$("#tip").html("用户名存在");
						$("#tip").slideDown();
						$("#tip").timer = setTimeout(function(){
							$("#tip").slideUp();
						},1000)
						break;
				case "1" : console.log("注册成功");
							clearTimeout($("#tip").timer);
							$("#tip").html("注册成功，稍后跳转");
							$("#tip").slideDown();
							$("#tip").timer = setTimeout(function(){
								$("#tip").slideUp();
								location.href = "index.html";
							},1000)
							break;
				default : console.log("服务器报错");
			}
		},function(e){
			console.log(e);
		})
	})
})
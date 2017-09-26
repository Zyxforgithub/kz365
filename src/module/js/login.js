require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3",
	}
})
require(["loadlogin","verification"],function(){
	$("form").verification({
		tip:$("#tip"),
		phone:$("#phone"),
		pwd:$("#password"),
		btn:$("#submit")
	},function(){

		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"POST",
			data:{
				status:"login",
				userID:$("#phone").val(),
				password:$("#password").val()
			}
		})
		.then(function(res){
			switch(res){
				case "0" :console.log("用户名不存在");
						clearTimeout($("#tip").timer);
						$("#tip").html("用户名不存在");
						$("#tip").slideDown();
						$("#tip").timer = setTimeout(function(){
							$("#tip").slideUp();
						},1000)
						break;
				case "2" : console.log("注册成功");
						clearTimeout($("#tip").timer);
						$("#tip").html("用户名和密码不符");
						$("#tip").slideDown();
						$("#tip").timer = setTimeout(function(){
							$("#tip").slideUp();
						},1000)
							
							break;
				default : console.log("登录成功");
						clearTimeout($("#tip").timer);
						$("#tip").html("登录成功，为您跳转页面");
						$("#tip").slideDown();
						$("#tip").timer = setTimeout(function(){
							$("#tip").slideUp();
							location.href = "index.html";
						},1000)

			}
		},function(e){
			console.log(e);
		})
	})
	
})
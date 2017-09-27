require.config({
	paths:{
		"jquery":"../lib/jquery-2.0.3",
	}
})
require(["loadlogin","verification","readCart"],function(a,b,Cookie){
	var cookie = new Cookie();
	if( Boolean(cookie.count("count")[0]) ){
		$("#phone").val(cookie.count("count")[0]["user"]);
		$("#password").val(cookie.count("count")[0].pass);
	}
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
				case "2" : console.log("用户名或密码错误");
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
						if( $("#savepass").prop("checked") ){
							cookie.count({
								key:"count",
								value:{"user":$("#phone").val(),"pass":$("#password").val()},
								exp:"15"
							})
						}else{
							cookie.count({
								key:"count",
								value:"",
								exp:"-1"
							})
						}
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
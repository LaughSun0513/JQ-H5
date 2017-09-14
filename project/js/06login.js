$(".login_footer").load("footer.html");

//切换服务密码和短信
$(".yzm").click(function(){
	$(".dx").css("display","block");
	$(".alert_box").eq(1).hide();
})
$(".fw").click(function(){
	$(".dx").css("display","none");
	$(".alert_box").eq(1).show();
})
//点击添加白色背景
$(".login_tab").find("li").click(function(){
	$(this).addClass("bg").siblings().removeClass("bg");
	//切换互联网登录
	if($(this).index()==1){
		$(".Inter_user").css("display","block");
		$(".phone_user").hide();
		$(".login_message>p").hide();
		$(".dx").css("display","none");

	}
	
	
	//切换手机登录
	if($(this).index()==0){
		$(".Inter_user").css("display","none");
		$(".login_message>p").show();
		$(".alert_box").eq(0).show();
		
		if($(".fw").prop("checked")){
			$(".dx").css("display","none");
			$(".alert_box").eq(1).show();
		}else if($(".yzm").prop("checked")){
			$(".dx").css("display","block");
			$(".alert_box").eq(1).hide();
		}
	}
	
})

	//登录界面，如果注册的密码和符合，就登录成功
	
	var cookie_email = getCookie("email");
	var cookie_pwd=getCookie("upwd");
$(".login_btn").click(function(){
	var useremail=$("#uemail").val();
	var userpwd=$("#upwd").val();
	if(useremail==cookie_email&&userpwd==cookie_pwd){
		location.href="../html/01index2.html"
	}else if(useremail!=cookie_email){
		$(".reg_box5").show().html("用户名有问题");
		$(".reg_box6").hide();
	}else if(userpwd!=cookie_pwd){
		$(".reg_box5").hide();
		$(".reg_box6").show().html("密码有问题");
	}else{
		$(".reg_box5").hide();
		$(".reg_box6").hide();
	}
})

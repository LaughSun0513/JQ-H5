$(".footer").load("footer.html")

var flagEmail=null;
$(".email").find("input").blur(function(){
	var reg=/^\w+@\w+\.\w+$/
	var str=$(this).val();
	if(!reg.test(str)){
		$(".reg_box1").css("display","block").html("请输入正确的邮箱地址");
		$(".s1").hide();
		flagEmail=false;
	}else{
		$(".reg_box1").css("display","none");
		$(".s1").show().html("邮箱可用");
		setCookie("email",JSON.stringify(str));
		flagEmail=true;
	}
})

var flagPwd=null;
$(".upwd").find("input").blur(function(){
	//一类字符 提示请使用字母、数字或符号的组合密码且必须包含两种组合
	//字符长度8+  长度为10，密码为强
	//两类字符 中
	//三类字符 强  包含数字 字母 特殊字符
	var regNum=/^\d+$/;			//纯数字
	var regLetter=/^[a-z]+$/;   //纯字母
	var regChar=/^[!@#$%^.]+$/;	//纯特殊字符
	
	var _regNum=/\d+/;			//包含数字
	var _regLetter=/[a-z]+/;	//包含字母
	var _regChar=/[!@#$%^.]+/;	//包含特殊字符
	
	 var str=$(this).val();

	if(str.length<8){
		$(".reg_box2").css("display","block").html("密码不可少于8位，请重新设置");
		$(".s2").hide();
		$(".qd_img>p").removeClass().addClass("password_strong");
		flagPwd=false;
	}else if(regNum.test(str)||regLetter.test(str)||regChar.test(str)){
		$(".reg_box2").css("display","block").html("请用字母、数字或符号的组合密码且必须包含两种组合")
		$(".s2").hide();
		$(".qd_img>p").removeClass().addClass("password_strong");
		flagPwd=false;
	}else if(_regNum.test(str)&&_regLetter.test(str)&&str.length<10||_regNum.test(str)&&_regChar.test(str)&&str.length<10||_regLetter.test(str)&&_regChar.test(str)&&str.length<10){
		//密码中
		$(".reg_box2").css("display","none");
		$(".qd_img>p").removeClass().addClass("z_side");
		flagPwd=true;
		setCookie("upwd",JSON.stringify(str));
	}else if(_regNum.test(str)&&_regLetter.test(str)&&_regChar.test(str)){//密码强，三者都有
		$(".reg_box2").css("display","none");
		$(".qd_img>p").removeClass().addClass("q_side");
		flagPwd=true;
		setCookie("upwd",JSON.stringify(str));
	}else if(_regNum.test(str)&&_regLetter.test(str)&&str.length>=10||_regNum.test(str)&&_regChar.test(str)&&str.length>=10||_regLetter.test(str)&&_regChar.test(str)&&str.length>=10){
		//密码强，两者并超过10个字符
		$(".reg_box2").css("display","none");
		$(".qd_img>p").removeClass().addClass("q_side");
		flagPwd=true;
		setCookie("upwd",JSON.stringify(str));
	}
	
	
})

var flagQ=null;
$(".qupwd").find("input").blur(function(){
	var str1=$(".upwd").find("input").val();
	var str2=$(".qupwd").find("input").val();
	if(str1==str2){
			$(".reg_box3").css("display","none");
			flagQ=true;
	}else{
			$(".s2").hide();
			$(".reg_box3").css("display","block").html("两次密码不一样");
			flagQ=false;
		
	}
})

//随机验证码
//思路：  在code值为 48 -- 122之间随机获取一个值   
//      如果  值在  58--64  或   91--96  之间  就重新抽  
	function rand(min,max){
		return Math.floor(Math.random()*(max-min+1)+min)
	}
	function getColor(){
			var r = rand(0,255).toString(16);
			var g = rand(0,255).toString(16);
			var b = rand(0,255).toString(16);
			return "#"+(r.length<2 ? ("0"+r) : r)  + (g.length<2 ? ("0"+g) : g) + (b.length<2 ? ("0"+b) : b);
		}
	
	function getCode(){
	var arr=[];
			for(var i = 0 ; i < 4 ; i++){
				var code = rand(48,122);
				while( code >= 58 && code <= 64   ||  code >= 91 && code <= 96 ){ //重抽
					code = rand(48,122);
				}
				arr[i] = String.fromCharCode(code);
			}
			var newArr=arr.join("")
			//生成验证码
			$(".random_yzm").html(newArr).css("color",getColor());
			return newArr;
	}
	
	getCode(); 
	
	$(".btn").click(function(){
			getCode();  	
		})
	
	var flagYzm=null;
	$(".rm_right_yzm>input").blur(function(){
		//获取验证码的内容
		var yzm1=$(".random_yzm").html().toLowerCase();
		//获取输入的内容
		var yzm2=$(".rm_right_yzm>input").val().toLowerCase();
		//判断两个是不是一样
		if(yzm1!=yzm2){	
			$(".reg_box4").css("display","block").html("验证码不正确");
			flagYzm=false;
		}else{	
			$(".reg_box4").css("display","none");
			flagYzm=true;
		}
	})
	
	
	
	$("#btn").submit(function(){
		if(flagEmail&&flagPwd&&flagQ&&flagYzm&&$(".read>input:checked")){
			return true;
		}else{
			return false;
		}
	})



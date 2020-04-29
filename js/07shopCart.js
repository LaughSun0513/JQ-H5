$("#header").load("header.html",function(){
	
		var arr=getCookie("shop");
		if(arr.length!=0){
			var topCount=0;
			for(var i in arr){
				topCount+=parseInt(arr[i].count)
			}
			$(".topcart").html(topCount);
		}
		
		//改变最顶层样式
		$(".topleft>li>a:first").html("个人客户").css("background","#fff");
		$a=$("<li><a style='width:100px'>欢迎来到中国移动</a></li>");
		$(".topleft").append($a);
		$(".ad").remove();
		$(".nav").remove();
		//去除顶层右边第一种样式
		$(".topright:first").hide();
		//添加第二种样式
		$(".topright").eq(1).show().find(".gocart").mouseover(function(){
			$(".gocart").addClass("active_li")
			$(".go").show();
		}).mouseout(function(){
			$(".gocart").removeClass("active_li")
			$(".go").hide();
		});
	
		//点击手机移动端，出现二维码
		$(".sjyyt").mouseover(function(){
			$(".ewm").show();
			$(".sjyyt").css("background","#fff")
		}).mouseout(function(){
			$(".ewm").hide();
			$(".sjyyt").css("background","#f6f6f6")
		})
		$(".topright li:first").find("a").mouseenter(function(){
			$(".ewm").css("display","block");
		}).mouseleave(function(){
			$(".ewm").css("display","none");
		})
		//放大镜效果
		//点击下面的小图，出现对应的中图和大图
		$("#bottom li").on({
			mouseenter:function(){
				var index=$(this).index();
				$(this).addClass("li_active").siblings("li").removeClass("li_active");				
				$("#small img").eq(index).show().siblings("img").hide();
				$("#big img").eq(index).show().siblings("img").hide();
			},
			mouseleave:function(){
				$(this).removeClass("li_active");	
			}
		})
		//放大镜效果
		$("#small").on({
			mouseenter:function(){
				$("#big").show();
				$("#mask").show();
			},
			mouseleave:function(){
				$("#big").hide();
				$("#mask").hide();
			},
			mousemove:function(e){
				var e=e||event;
				var x=e.pageX-$("#box").offset().left-$("#mask").width()/2
				var y=e.pageY-$("#box").offset().top-$("#mask").height()/2;
				var maxL=$("#small").width()-$("#mask").width();
				var maxT=$("#small").height()-$("#mask").height();
				x=Math.min(Math.max(0,x),maxL);
				y=Math.min(Math.max(0,y),maxT);
				$("#mask").css({left:x,top:y})
				
				//大图宽/小图宽=大图left/x---公式很关键
				var bigImgX=x*$("#big img").eq(0).width()/$("#small img").eq(0).width();
				var bigImgY=y*$("#big img").eq(0).height()/$("#small img").eq(0).height();
				$("#big img").css({
					left:-bigImgX,
					top:-bigImgY
				})
			}
		})
		//点击左右箭头，出现隐藏的小图
		$(".bottom_left").on({
			click:function(){
				$(".bottom_img").animate({"margin-left":-73})
			}
		})
		$(".bottom_right").on({
			click:function(){
				$(".bottom_img").animate({"margin-left":-4})
			}
		})
		//选择信息，添加红框
		$("#shop_messages dd>a").click(function(){
			$(this).addClass("a_hover").siblings().removeClass("a_hover");
		})
		//点击规格参数等，选项卡效果
		$(".s_right_top>li").click(function(){
			$(this).addClass("a_hover2").siblings("li").removeClass("a_hover2");
		})
		
		
		//吸顶效果
		$(window).scroll(function(){
			var sTop=$(document).scrollTop();
			if(sTop>683){
				$(".float_tab").show().css({"position":"fixed","top":0});
			}else{
				$(".float_tab").hide();
			}
		})
		//点击吸顶后的规格参数等，选项卡效果
		$(".float_tab>ul>li").on({
			click:function(){
				$(this).addClass("li_hover").siblings("li").removeClass("li_hover");
			}
		})
		
		//购物车操作
		
			//加减操作
			$(".updateCount").click(function(){
					var sign=$(this).html();//获取加减符号
					var count=$(".count").val();//获取界面的数据
					if(sign=="-"&&count==1){
						return;
					}else{
						sign=="+"?count++:count--;
					}
					$(".count").val(count);
				})	
		
	/*	{
			shop:[
				{_json1},
				{_json2},
				{_json3}
			]
		}*/
		//var arr=getCookie("shop");//因为是点击一下存入一个json，如果进入购物车不存在shop，arr就是空数组，如果有，后面的商品就会叠加在后面
		
		//添加到购物车
		$(".buy").click(function(){
			var arr=[];
			var name=$(".name>p").html();
			var price=$(".price").html();
			//将数据存入json中，{_json1},{_json2},
			var _json={
				"src":$(".bottom_img>li>img:first").attr("src"),
				"name":name,
				"price":price,
				"color":$(".a_hover").eq(1).html(),
				"memory":$(".a_hover").eq(2).html(),
				"count":$(".count").val()
			}
			//将json存到数组中  [{_json1},{_json2},{_json3}]
			var flag=true;//表示可以向数组中添加数据
			var cookieInfo=getCookie("shop");
			if(cookieInfo.length!=0){
				arr=cookieInfo;//表示cookie中有数据
				for(var i in arr){
					if(_json.name==arr[i].name&&_json.color==arr[i].color&&_json.memory==arr[i].memory){
						arr[i].count=Number(arr[i].count)+Number(_json.count)//json数据里的count叠加
						flag=false;
						break;
					}
				}
			}
			//如果商品名不同，就存入到数组中，与商品名相同不能同时执行
			if(flag){
				arr.push(_json);
			}
			//cookie中存入的是字符串，“shop：[{_json1},{_json2},{_json3}]”
			setCookie("shop",JSON.stringify(arr));
			
			//存完后进入结算购物车操作
			var f=confirm("请问你是否想继续购买?确定--继续购买 取消--结算");
			if(!f){//取消，跳转结算购物车
				location.href="../html/07shopCart_add.html";
			}
			
		})
})		
$(".footer").load("footer.html")

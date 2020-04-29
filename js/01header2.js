$("#header").load("header.html",function(){
		
		$(".topright").eq(0).hide();
		$(".topright").eq(1).show();
		
		$(".ad>img:first").attr("src","../images/ad big.jpg");
		setTimeout(function(){
			$(".ad>img:first").attr("src","../images/ad.jpg");
		},2000)
	
		$(".topright li:first").find("a").mouseenter(function(){
			$(".ewm").css("display","block");
		}).mouseleave(function(){
			$(".ewm").css("display","none");
		})
		
		$(".ad>img:last").click(function(){
			$(this).parent().hide();
		})
		
		$(".nav>li").mouseenter(function(){
			$(this).addClass("active").siblings().removeClass("active")
			$(this).find("ul").show().siblings("ul").hide();
		}).mouseleave(function(){
			$(this).find('ul').hide().siblings("ul").show();
		})
	})
$(".footer").load("footer.html")
	


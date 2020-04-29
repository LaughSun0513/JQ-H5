$(function(){
	var flag1= true;
	var flag2=true;
	 timer=setInterval(autoGd,2000);
	function autoGd(){//一张图片的宽度是285，实际移动的距离是图片+两边margin
			$(".bigbox").animate({"marginLeft":-300},1000,function(){
				$(".bigbox").css("margin-left",0)
						   .find(".box:first")
						   .css("margin",7.5)
						   .appendTo(".bigbox")
							flag1=true;
							flag2= true;
			})
	}
	$(".gd_right").click(function(){
		if( flag2 ){   //控制连续点击
			
			clearInterval(timer2);
			clearInterval(timer);
			if( flag1 ){   //控制定时器方向
				timer=setInterval(autoGd,2000);
				flag1= false
			}
			autoGd();
			flag2 = false;
		}
	})
	
	var timer2 = null;
	function autoleft(){
		$(".bigbox").find(".box:last")
						   		.prependTo(".bigbox")
								.end()
								.css("marginLeft",-300)
								.animate({"margin":7.5},1000,function(){
									flag1= true;
									flag2  = true
								})
	}
	$(".gd_left").click(function(){
		if( flag2 ){
			
			clearInterval(timer);
			clearInterval( timer2 );
			if(  flag1  ){
				timer2 = setInterval(autoleft,2000);
				flag1= false;
			}
			autoleft()
			flag2 = false;
		}
	})
	
	

})

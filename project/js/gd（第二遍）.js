$(function(){
	var flag1=true;//控制方向
	var flag2=true;//控制连续点击
	var timer=setInterval(autoPlay,2000)
	function autoPlay(){//一张图片的宽度是285，实际移动的距离是图片+两边margin
		$(".bigbox").animate({"margin-left":-300},1000,function(){
					$(".bigbox").css("margin-left",0)
								.find(".box:first")
								.appendTo($(".bigbox"))
								flag1=true;
								flag2=true;
		})
	}
	var timer2=null;
	function autoLeft(){
		$(".bigbox").find(".box:last")
					.prependTo(".bigbox")
					.end()
					.css("margin-left",-300)
					.animate({"margin-left":7.5},1000,function(){
						flag1=true;
						flag2=true;
					})
	}
	$(".gd_left").click(function(){
		
		if(flag2){
			clearInterval(timer);
			clearInterval(timer2);
				if(flag1){
				timer2=setInterval(autoLeft,2000);
				flag1=false;
			}
			autoLeft();
			flag2=false;
		}
		
		
	})
	$(".gd_right").click(function(){
		
		if(flag2){
			clearInterval(timer);
			clearInterval(timer2);
			if(flag1){
				timer=setInterval(autoPlay,2000)
				flag1=false;
			}
			autoPlay();
			flag2=false;
		}
	})
})

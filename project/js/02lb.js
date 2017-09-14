//隐藏菜单
$(".menu>li").mouseenter(function(){
	$(this).addClass("newCss");
	$(this).find("div").show(500);
	$(this).find("div").addClass("newCss2");
}).mouseleave(function(){
	$(this).removeClass("newCss");
	$(this).find("div").hide(500)
	$(this).find("div").removeClass("newCss2");
})


//轮播图
var index=0;
var timer1=setInterval(autoPlay,3000);
function autoPlay(){
	index++;
	if(index==$(".m-center>ul>li").size()){
		index=0;
	}
	$(".m-center>ol>li").eq(index).addClass("active").siblings().removeClass("active");
	$(".m-center>ul").animate({"margin-left":-780},1000,function(){
		$(".m-center>ul").find("li:first").appendTo($(".m-center>ul")).end().end().css("margin-left",0);
		flag=true;
	})
	
	
}


var flag=true;
$(".m-center").mouseover(function(){
	clearInterval(timer1)
	$(".m-center_left,.m-center_right").show();
}).mouseout(function(){
	$(".m-center_left,.m-center_right").hide();
	timer1=setInterval(autoPlay,3000);
})

$(".m-center_right").click(function(){
	if(flag){
		autoPlay();
		flag=false;
	}
})

	

$(".m-center_left").click(function(){
	if(flag){
		index--;
		if(index==$(".m-center>ul>li").size()){
		index=0;
		}
		$(".m-center>ol>li").eq(index).addClass("active").siblings().removeClass("active");
		$(".m-center ul").find("li:last")
						 .prependTo($(".m-center ul"))
						 .end()
						 .css("margin-left",-780)
						 .animate({"marginLeft":0},1000,function(){
						 	flag=true;
						 })
		flag=false;
	}
})
$("ol li").click(function(){
	clearInterval(timer1);
	Index=$(this).index();//记录当前下标
	$(this).addClass("active").siblings().removeClass("active");
	$(".m-center>ul").animate({"margin-left":-780*Index})
})

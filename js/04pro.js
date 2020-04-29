$(".yiru").mouseenter(function(){
	$(this).stop().animate({"marginRight":10},300)
}).mouseleave(function(){
	$(this).stop().animate({"marginRight":0},300)
})

var timer=setInterval(autoLeft,10000);
function autoLeft(){
		$first_li=$(".notice_box").find("li").eq(0);	
		$last_li=$(".notice_box").find("li").eq(2);
		$last_li.insertBefore($first_li)

	
}
$(".notice_left").click(function(){
	clearInterval(timer);	
	$first_li=$(".notice_box li:first");
	$(".notice_box").append($first_li);
})
$(".notice_right").click(function(){
	$last_li=$(".notice_box li:last");
	$(".notice_box").prepend($last_li);
})


$(".fc2").find("img").mouseenter(function(){
	$(this).stop().animate({"marginRight":40},500)
}).mouseleave(function(){
	$(this).stop().animate({"marginRight":-25})
})
//楼层效果
$(window).scroll(function(){
	var sTop=$(document).scrollTop();
	if(sTop>0){
		$(".floor").show();
	}else{
		$(".floor").hide();
	}
	$(".floor>ul").find("li").eq(1).click(function(){
		$("html,body").stop().animate({"scrollTop":1232},500)
	})
	$(".floor>ul").find("li").eq(2).click(function(){
		$("html,body").stop().animate({"scrollTop":165},500)
	})
	$(".floor>ul").find("li").eq(3).click(function(){
		$("html,body").stop().animate({"scrollTop":2171},500)
	})
	$(".floor>ul").find("li").eq(4).click(function(){
		$("html,body").stop().animate({"scrollTop":1621},500)
	})
	$(".floor>ul").find("li").eq(5).click(function(){
		$("html,body").stop().animate({"scrollTop":1150},500)
	})
	$(".floor>ul").find("li").eq(6).click(function(){
		$("html,body").stop().animate({"scrollTop":266},500)
	})
	$(".floor>ul").find("li").eq(7).click(function(){
		$("html,body").stop().animate({"scrollTop":154},500)
	})
	$(".floor>ul").find("li").eq(8).click(function(){
		$("html,body").stop().animate({"scrollTop":0},500)
	})
})

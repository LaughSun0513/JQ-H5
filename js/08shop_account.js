$(function(){
	
	var arr=getCookie("shop");
	console.log(arr);
	var topCount=0;
	for(var i in arr){
		topCount+=parseInt(arr[i].count)
	}
	console.log(topCount)
	console.log($(".topcart").parent());
	$(".topcart").html(topCount);
	
	var arr=getCookie("shop");//arr==>shop:[{_json1},{_json2}]
	var str="";
		for(var i in arr){
				var shopinfo=arr[i];//{_json1},{_json2}
				str+=	 `<dl>
							<div class="shop_left">
								<dd><input type="checkbox" class="ck" data-id="${shopinfo.name}"/></dd>
								<dd><img src="${shopinfo.src}" alt="" /></dd>
								<dd><span class="shop_name">${shopinfo.name}</span></dd>
								<dd><span class="shop_color">${shopinfo.color}</span></dd> 
								<dd><span class="shop_memory">${shopinfo.memory}</span></dd>
							</div>
							
							
							<div class="shop_right">
								<dd>${shopinfo.price}</dd>
								<dd>
									<button class="updateCount" data-number="-1">-</button>
									<input type="text" class="shopCount" value="${shopinfo.count}" />
									<button class="updateCount" data-number="1">+</button>
								</dd>
								<dd class="shopinfoMoney">${shopinfo.price*shopinfo.count}</dd>
								<dd><a href="javascript:;" class="del" data-id="${shopinfo.name}" data-color="${shopinfo.color}" data-memory="${shopinfo.memory}">删除</a></dd>
							</div>
						</div>
					</dl>`
			
	}

	$("#js_main").html(str);
	
	var arr=getCookie("shop");
	var topCount=0;
	for(var i in arr){
	topCount+=parseInt(arr[i].count)
	}
	$(".topcart").html(topCount);

	//点击删除键 ，删除数组中的该json数据，删除cookie中的该json数据，删除界面
	$(".del").click(function(){
		console.log(111);
		var shop_id=$(this).data("id");//找到该商品名，通过data-id
		var shop_color=$(this).data("color");
		var shop_memory=$(this).data("memory");
		for(var i in arr){
			if(arr[i].name==shop_id&&arr[i].color==shop_color&&arr[i].memory==shop_memory){//数组中的某个json的name和点击按钮的那一排的商品名一样
				arr.splice(i,1);	//就将该json数据从arr中删除
				setCookie("shop",JSON.stringify(arr));//删除cookie中的该json数据
				$(this).parent().parent().parent().remove();//删除界面
			}
			
		}
		//如果里面没有产品，内容，就跳转到空空如也
		if($("#js_main").html()==""){	
			location.href="../html/09shopCart_empty.html";
		}
	})
	
	//加减操作
	$(".updateCount").click(function(){
			var sign=$(this).html();//获取加减符号
			var count=$(this).parent().find("input").val();//获取界面的数据
			
			//思路：首先判断点击的是哪个商品的加减号，再进行符号判断
			var pid=$(this).parent().parent().parent().find(".shop_name").html();
			var pcolor=$(this).parent().parent().parent().find(".shop_color").html();
			var pmemory=$(this).parent().parent().parent().find(".shop_memory").html();
		
		//遍历数组中json对象，哪个json对象的name值和pid一样，就找到了该json数据
			for(var i in arr){
				if(sign=="-"&&count==1){//如果是减号，并且值为1，就不能再减
					return;
				}
			if(arr[i].name==pid&&arr[i].color==pcolor&&arr[i].memory==pmemory){
				sign=="+"?count++:count--;
				setCookie("shop",JSON.stringify(arr));
				var newCount=$(this).parent().find("input").val(count);
				//计算总价
				$(this).parent().next().html(newCount.val()*$(this).parent().parent().find("dd").eq(0).html()+"元");
				jiesuan();
			}
		}
	})
	
	//结算
	$(".selectAll").click(function(){
		//全选操作 
		//思路:点击全选，商品复选框勾上，变色
	     //    点击取消，商品复选框取消，去色	     
		$(".ck").prop("checked",$(this).prop("checked"));
		jiesuan();
		if($(".ck").is(":checked")){
			$(".ck").parent().parent().parent().css("background","#edf8ff");
		}else{
			$(".ck").parent().parent().parent().css("background","#fff");
		}
	})
	//单选操作
	$(".ck").click(function(){
		//变背景色
		jiesuan();
		if($(this).is(":checked")){
			$(this).parent().parent().parent().css("background","#edf8ff");
		}else{
			$(this).parent().parent().parent().css("background","#fff");
		}
	})
	
	//删除选中商品
	$(".delSelect").click(function(){
		$(".ck:checked").each(function(){
			var shop_id=$(this).data("id");
			for(var i in arr){
				for(var i in arr){
					if(arr[i].name==shop_id){//数组中的某个json的name和点击按钮的那一排的商品名一样
						arr.splice(i,1);	//就将该json数据从arr中删除
						setCookie("shop",JSON.stringify(arr));//删除cookie中的该json数据
						$(this).parent().parent().parent().remove();//删除界面
						jiesuan();
					}
				}
			}
		})
	})
})
	//封装一个函数，专门用来处理最下面的结算和显示结果问题
	function jiesuan(){
		//根据对勾  累加数量和金额
		var count=0;
		var money=0;
		$(".ck:checked").each(function(){
			count+=parseInt($(this).parent().parent().next().find("input").val());
			money+=parseInt($(this).parent().parent().next().find(".shopinfoMoney").html());
		})
		$(".countAll").html(count);
		$(".moneyAll").html("￥"+money+".00");
	}



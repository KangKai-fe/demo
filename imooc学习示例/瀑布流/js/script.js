window.onload = function(){
	waterfall("main","box");
	var dataInt = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]}//模拟从后台调取json数据
	window.onscroll = function(){
		if(checkScrollSlide){
			var oParent = document.getElementById("main");
			//将数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox = document.createElement("div");
				oBox.className = "box";
				oParent.appendChild(oBox);
				var oPic = document.createElement("div");
				oPic.className = "pic";
				oBox.appendChild(oPic);
				var oImg = document.createElement("img");
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall("main","box");
		}
	};
}

function waterfall(parent,box){
//将main下的所有的class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box);
//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
//设置main的宽
	oParent.style.cssText += "width:" + oBoxW*cols + "px; margin:0 auto;"
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if (i<cols) {//第一行
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinHIndex(hArr,minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH + "px";
			hArr[index] += oBoxs[i].offsetHeight;
			//oBoxs[i].style.left = oBoxW*index + "px";
			oBoxs[i].style.left = oBoxs[index].offsetLeft + "px";
		}
	}
}

//根据class获取元素
function getByClass(parent,clsName){
	var boxArr = new Array(),//用来存储获取到的所有的class为box的元素
		oElements = parent.getElementsByTagName("*");
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className.indexOf(clsName)!=-1){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}

//获取
function getMinHIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//检测是否具备加载数据块的条件
function checkScrollSlide(){
	var oParent = document.getElementById("main");
	var oBoxs = getByClass(oParent,"box");
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//窗口滚走距离：标准模式||混杂模式
	var height = document.documentElement.clientHeight || document.body.clientHeight;//浏览器窗口距离
	return (lastBoxH<scrollTop+height)?true:false;
	}
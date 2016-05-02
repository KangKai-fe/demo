/*->如何在一个网站或者一个页面,去书写你的js代码
	1. js的分层(功能) : jquery(tools)	组件(ui)->可复用	应用(app); MVC(backbone.js)
	2. js的规划(管理) : 避免全局变量和全局方法(命名空间, 闭包, 面向对象); 模块化(sea.js, require.js)*/


window.onload = function() {
	kk.app.toTip();
	kk.app.toBanner();
	kk.app.toSell();
	kk.app.toScroll();
}
var kk = {};	//命名空间

kk.tools = {};

//按class获取元素->公用的
kk.tools.getByClass = function(oParent, sClass) {
	var aEle = oParent.getElementsByTagName("*");
	var arr = [];

	for (var i = 0; i < aEle.length; i++) {
		if(aEle[i].className == sClass) {
			arr.push(aEle[i]);
		}
	}

	return arr;
};

//获取当前样式
kk.tools.getStyle = function(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
};

kk.ui = {};

//焦点文字变化
kk.ui.textChange = function(obj, str) {

	obj.onfocus = function() {
		if(this.value == str){
			this.value = "";
		}
	};

	obj.onblur = function() {
		if(this.value == ""){
			this.value = str;
		}
	};
};

//淡入
kk.ui.fadeIn = function(obj) {

	var iCur = kk.tools.getStyle(obj, "opacity");
	if(iCur == 1) {
		return false;
	}

	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iSpeed = 5;
		if(value == 100) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = "alpha(opacity=" + value + ")";
		}
	},30);
};

//淡出
kk.ui.fadeOut = function(obj) {

	var iCur = kk.tools.getStyle(obj, "opacity");
	if(iCur == 0) {
		return false;
	}

	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iSpeed = -5;
		if(value == 0) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = "alpha(opacity=" + value + ")";
		}
	},30);
};

//向左运动
kk.ui.moveLeft = function(obj, iCur, iTarget) {

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {

		var iSpeed = (iTarget - iCur)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if(iCur == iTarget) {
			clearInterval(obj.timer);
		} else {
			iCur += iSpeed;
			obj.style.left = iCur + "px";
		}

	}, 30);
};

kk.app = {};

//文本框获得和失去焦点
kk.app.toTip = function() {
	var oText1 = document.getElementById("text1");
	var oText2 = document.getElementById("text2");

	kk.ui.textChange(oText1, "Search website");
	kk.ui.textChange(oText2, "Search website");
};

//Banner淡入淡出
kk.app.toBanner = function() {
	var oAds = document.getElementById("ads");
	var aLi = oAds.getElementsByTagName("li");

	var oPrev_bg = kk.tools.getByClass(oAds, "prev_bg")[0];
	var oNext_bg = kk.tools.getByClass(oAds, "next_bg")[0];

	var oPrev = kk.tools.getByClass(oAds, "prev")[0];
	var oNext = kk.tools.getByClass(oAds, "next")[0];

	var iNow = 0;

	var timer = setInterval(auto, 3000);

	function auto() {


        /*从此处判断obj是否需要fadeIn和fadeOut
        或者在fadeIn和fadeOut中判断obj的透明度是否为0或100
	        if(iNow == aLi.length-1) {
	            kk.ui.fadeOut(aLi[iNow]);
	            iNow = 0;
	            kk.ui.fadeIn(aLi[iNow]);
	        } else {
	            kk.ui.fadeOut(aLi[iNow]);
	            iNow++;
	            kk.ui.fadeIn(aLi[iNow]);
	        }
        */


		if(iNow == aLi.length-1) {
			iNow = 0;
		} else {
			iNow++;
		}

		for(var i=0;i<aLi.length;i++) {
			kk.ui.fadeOut(aLi[i]);
		}

		kk.ui.fadeIn(aLi[iNow]);

	};

	function autoPrev() {

		if(iNow == 0) {
			iNow = aLi.length-1;
		} else {
			iNow--;
		}

		for(var i=0;i<aLi.length;i++) {
			kk.ui.fadeOut(aLi[i]);
		}

		kk.ui.fadeIn(aLi[iNow]);

	};

	oPrev_bg.onmouseover = oPrev.onmouseover =  function() {
		oPrev.style.display = "block";
		clearInterval(timer);
	};

	oNext_bg.onmouseover = oNext.onmouseover = function() {
		oNext.style.display = "block";
		clearInterval(timer);
	};

	oPrev_bg.onmouseout = oPrev.onmouseout = function() {
		oPrev.style.display = "none";
		timer = setInterval(auto, 3000);
	};

	oNext_bg.onmouseout = oNext.onmouseout = function() {
		oNext.style.display = "none";
		timer = setInterval(auto, 3000);
	};

	oPrev.onclick = function() {
		autoPrev();
	};

	oNext.onclick = function() {
		auto();
	};

};

//下拉菜单
kk.app.toSell = function() {
	var oSell = document.getElementById("sell");
	var aDd = oSell.getElementsByTagName("dd");
	var aUl = oSell.getElementsByTagName("ul");
	var aH2 = oSell.getElementsByTagName("h2");

	for(var i=0; i<aDd.length; i++) {
		aDd[i].index = i;
		aDd[i].onclick = function(ev) {
			var ev = ev || window.event;
			var _this = this;

			for(var j=0; j<aUl.length; j++) {
				aUl[j].style.display = "none";
			}

			aUl[this.index].style.display = "block";

			document.onclick = function() {
				aUl[_this.index].style.display = "none";
			};

			ev.cancelBubble = true;
		};

	}

	for(var i=0; i<aUl.length;i++) {
		aUl[i].index = i;
		(function(ul){

			var aLi = ul.getElementsByTagName("li");

			for(var i=0; i<aLi.length;i++) {
				aLi[i].onmouseover = function() {
					this.className = "active";
				};
				aLi[i].onmouseout = function() {
					this.className = "";
				};
				aLi[i].onclick = function(ev) {
					var ev = ev || window.event;
					aH2[this.parentNode.index].innerHTML = this.innerHTML;
					this.parentNode.style.display = "none";
					ev.cancelBubble = true;
				}
			}

		})(aUl[i]);
	}

};

//无缝滚动
kk.app.toScroll = function() {
	var oScroll = document.getElementById("scroll1");
	var oUl = oScroll.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");

	var oPrev = kk.tools.getByClass(oScroll, "prev")[0];
	var oNext = kk.tools.getByClass(oScroll, "next")[0];

	var iNow = 0;

	oUl.innerHTML += oUl.innerHTML;

	oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";

	oPrev.onclick = function() {
		if(iNow == 0) {
			iNow = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + "px";
		}
		kk.ui.moveLeft(oUl, -iNow*aLi[0].offsetWidth, -(iNow-1)*aLi[0].offsetWidth);
		iNow--;
	};

	oNext.onclick = function() {
		if(iNow == aLi.length/2) {
			iNow = 0;
			oUl.style.left = 0;
		}
		kk.ui.moveLeft(oUl, -iNow*aLi[0].offsetWidth, -(iNow+1)*aLi[0].offsetWidth);
		iNow++;
	};
};

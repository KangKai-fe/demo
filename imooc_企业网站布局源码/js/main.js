window.onload = function() {
	kk.app.toBanner();
	kk.app.toScroll();
}

// 命名空间
var kk = {};

// 公用
kk.tools = {};

kk.tools.getByClass = function(oParent, sClass) {
	var aEle = oParent.getElementsByTagName("*");
	var arr = [];

	for (var i = 0; i < aEle.length; i++) {
		if(aEle[i].className.indexOf(sClass) !== -1) {
			arr.push(aEle[i]);
		}
	}

	return arr;

};


kk.tools.getStyle = function(obj, attr) {

	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
};

// 组件(可复用)
kk.ui = {};

kk.ui.moveLeft = function(obj, iCur, iTarget) {

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {

		var iSpeed = (iTarget - iCur)/10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if(iCur === iTarget) {
			clearInterval(obj.timer);
		} else {
			iCur += iSpeed;
			obj.style.left = iCur + "px";
		}

	},30);
};

kk.ui.setActive = function(arr, index) {
	for (var i = 0; i < arr.length; i++) {
		arr[i].className = "";
	}
	arr[index].className = "active";
};

// 应用
kk.app = {};

kk.app.toBanner = function() {
	var oList = document.getElementById("banner_list");
	var aImgs = oList.getElementsByTagName("img");

	var oPrev = document.getElementById("prev");
	var oNext = document.getElementById("next");

	var aBtns = document.getElementById("banner_buttons").getElementsByTagName("span");

	var iNow = 0;
	var iWidth = aImgs[0].offsetWidth;
	oList.style.width = aImgs.length * iWidth + "px";

	var timer = setInterval(auto, 3000);

	function auto() {
		if(iNow === aImgs.length - 1) {
			kk.ui.moveLeft(oList, -iNow * iWidth, 0);
			iNow = 0;
		} else {
			kk.ui.moveLeft(oList, -iNow * iWidth,  -(iNow + 1) * iWidth);
			iNow ++;
		}
		kk.ui.setActive(aBtns, iNow);
	};

	function autoPrev() {
		if(iNow === 0) {
			iNow = aImgs.length - 1;
			kk.ui.moveLeft(oList, 0, -iNow * iWidth);
		} else {
			kk.ui.moveLeft(oList, -iNow * iWidth, -(iNow - 1) * iWidth)
			iNow --;
		}
		kk.ui.setActive(aBtns, iNow);
	};

	oList.onmouseover = function() {
		clearInterval(timer);
	};
	oPrev.onmouseover = function() {
		clearInterval(timer);
	};
	oNext.onmouseover = function() {
		clearInterval(timer);
	};
	oList.onmouseout = function() {
		timer = setInterval(auto, 3000);
	};
	oPrev.onmouseout = function() {
		timer = setInterval(auto, 3000);
	};
	oNext.onmouseout = function() {
		timer = setInterval(auto, 3000);
	};

	oNext.onclick = function() {
		auto();
	};
	oPrev.onclick = function() {
		autoPrev();
	};

	for (var i = 0; i < aBtns.length; i++) {

		aBtns[i].index = i;

		aBtns[i].onmouseover = function() {

			clearInterval(timer);
			this.className = "active";

		};

		aBtns[i].onmouseout = function() {

			timer = setInterval(auto, 3000);
			kk.ui.setActive(aBtns, iNow);
		};

		aBtns[i].onclick = function() {

			kk.ui.moveLeft(oList, -iNow * iWidth, -this.index * iWidth);
			iNow = this.index;
			kk.ui.setActive(aBtns, iNow);
		};
	}
}


kk.app.toScroll = function() {

	var oBox = document.getElementById("news_scroll_box");
	var oUl = oBox.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");

	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi[0].offsetWidth * aLi.length + "px";

	var timer = setInterval(scrollLeft, 30);

	function scrollLeft() {
		var iLeft = parseInt(kk.tools.getStyle(oUl, "left"));
		if(iLeft <= -oUl.offsetWidth / 2) {
			iLeft = 0;
		}	else {
			iLeft -= 1;
			console.log(iLeft);
		}

			oUl.style.left = iLeft + "px";
	};

	oBox.onmouseover = function() {
		clearInterval(timer);
	};

	oBox.onmouseout = function() {
		timer = setInterval(scrollLeft, 30);
	};
}
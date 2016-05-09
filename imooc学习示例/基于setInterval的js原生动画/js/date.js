function getStyle(obj,attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  }
  else{
    return getComputedStyle(obj,false)[attr];
  }
}

//json = {attr1:iTarget1,attr2:iTarget2,attri,iTargeti}

function startMove(obj,json,fn){			//-->fn为回调函数
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;						//-->假设
		for(var attr in json){
			var icur = 0;
			if(attr == "opacity"){
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - icur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(icur != json[attr]){
				flag = false
			}
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity" + (icur + speed) + ")";
				obj.style.opacity = (icur + speed)/100;
			}else{
				obj.style[attr] = (icur + speed) + "px";
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},30)
}

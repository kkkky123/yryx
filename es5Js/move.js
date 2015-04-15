function getStyle(obj,attr){
		if(obj.currentStyle){
			//IE only
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}	
	function startMove(obj,attr,iTarget,fn){		
		var iSpeed=0;
		var iStyle=0;		
		clearInterval(obj.timer);
		iStyle=(attr=='opacity'?parseInt(parseFloat(getStyle(obj,attr))*100):parseInt(getStyle(obj,attr)));
		obj.timer=setInterval(function(){		
			var dis=iTarget-iStyle;
			iSpeed=dis>0?Math.ceil(dis/8):Math.floor(dis/8);
			if(iStyle==iTarget){
				clearInterval(obj.timer);
				if(fn)fn();
			}else{
				iStyle+=iSpeed;
				if(attr=='opacity'){
					obj.style[attr]=iStyle/100;
					obj.style.filter='alpha(opacity='+iStyle+')';
				}else{
					obj.style[attr]=iStyle+'px';
				}		
			}
		},30);
	};
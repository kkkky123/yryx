function getStyle(obj,attr){
		if(obj.currentStyle){
			//IE only
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}	
function startMove(obj,json,fn){		
	var iSpeed=0;
	var iStyle=0;		
	clearInterval(obj.timer);	
	obj.timer=setInterval(function(){	
		var bStop=true;
		for(var attr in json){
			iStyle=(attr=='opacity'?parseInt(parseFloat(getStyle(obj,attr))*100):parseInt(getStyle(obj,attr)));
			var dis=json[attr]-iStyle;
			iSpeed=dis>0?Math.ceil(dis/8):Math.floor(dis/8);
			if(iStyle!=json[attr]){
				bStop=false;
			}
			iStyle+=iSpeed;
			if(attr=='opacity'){
				obj.style[attr]=iStyle/100;
				obj.style.filter='alpha(opacity='+iStyle+')';
			}else{
				obj.style[attr]=iStyle+'px';
			}	
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fn)fn();
		}
	},30);
};
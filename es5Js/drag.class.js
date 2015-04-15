function drag(id){
	var mydiv=document.getElementById(id);
	mydiv.onmousedown=function(ev){
		var myevent=ev || enent;
		var disX=myevent.clientX-mydiv.offsetLeft;//鼠标位置与div本身的x,y轴坐标差
		var disY=myevent.clientY-mydiv.offsetTop;
		
		if(mydiv.setCapture){//以下写法只在ie当中可以用，别的可以使用下面的
			mydiv.setCapture();//该函数表示mydiv这个对象捕获了当前页面所有的鼠标操作
			mydiv.onmousemove=function(ev){
				var myevent=ev || enent;
				
				var left=myevent.clientX-disX;
				var top=myevent.clientY-disY;
				if(left<50){//判断边界和磁性吸附，其实就是距离边界小于多少距离时，直接放在边界就可以了
					left=0;
				}else if(left>document.documentElement.clientWidth-mydiv.offsetWidth-50){
					left=document.documentElement.clientWidth-mydiv.offsetWidth;
				}
				if(top<30){
					top=0;
				}else if(top>document.documentElement.clientHeight-mydiv.offsetHeight-30){
					top=document.documentElement.clientHeight-mydiv.offsetHeight;
				}
				mydiv.style.left=left+'px';
				mydiv.style.top=top+'px';
			};
			mydiv.onmouseup=function(){
				mydiv.onmousemove=null;
				mydiv.onmouseup=null;
				mydiv.releaseCapture();//释放捕获
			};
		}
		else{
			document.onmousemove=function(ev){
				var myevent=ev || enent;
				var left=myevent.clientX-disX;
				var top=myevent.clientY-disY;
				if(left<50){
					left=0;
				}else if(left>document.documentElement.clientWidth-mydiv.offsetWidth-50){
					left=document.documentElement.clientWidth-mydiv.offsetWidth;
				}
				if(top<30){
					top=0;
				}else if(top>document.documentElement.clientHeight-mydiv.offsetHeight-30){
					top=document.documentElement.clientHeight-mydiv.offsetHeight;
				}
				mydiv.style.left=left+'px';
				mydiv.style.top=top+'px';
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			};
		}
		return false;//阻止默认行为
	};
}
var heroColor=new Array("#BA9658","#FEF26E");
var enemyColor=new Array("#00A2B5","#00FEFE");

//爆炸效果函数，这里只要知道坐标就行了，通过切换图片实现动态爆炸效果
function Bomb(x,y){
	this.x=x;
	this.y=y;
	this.isLive=true;
	this.blood=9;
	this.bloodDown=function(){
		if(this.blood>0){
			this.blood--;
		}
		else{
			this.isLive=false;
		}
	}
}

	//子弹类，包括子弹的坐标和方向，还有发射子弹的对象本身和对象的种类
	function Bullet(x,y,direct,type,tank){
		this.x=x;
		this.y=y;
		this.direct=direct;
		this.speed=3;//速度可以自己定义
		this.type=type;
		this.tank=tank;
		this.timer=null;//用于结束setInterval函数
		this.isLive=true;//用于刷新时判断画不画出该子弹
		this.run=function(){
			//子弹到达边界或者碰到对方坦克时就消失
			if(this.x<=0||this.x>=400||this.y<=0||this.y>=300||this.isLive==false){
				window.clearInterval(this.timer);
				//子弹死亡
				this.isLive=false;
				if(this.type=="enemy"){//如果是敌方坦克，同时只能有一颗子弹在画布上
					this.tank.BulletLive=false;
				}
			}
			else{
				switch(this.direct){
					case 0:
						this.y-=this.speed;
					break;
					case 1:
						this.x+=this.speed;
					break;
					case 2:
						this.y+=this.speed;
					break;
					case 3:
						this.x-=this.speed;
					break;
				}
			}
			//document.getElementById('span1').innerText="子弹x="+this.x+" 子弹y="+this.y;
		}
	}
	function Tank(x,y,direct,color){
		this.x=x;
		this.y=y;
		this.direct=direct;
		this.speed=2;
		this.isLive=true;
		this.color=color;
		
	}
	function HeroTank(x,y,direct,color){
		this.tank=Tank;
		this.tank(x,y,direct,color);
		delete this.tank;//冒充之后把这个删掉才不会造成覆盖
		this.isLive=true;
		this.moveUp=function(){
			if(this.y>=0){
				this.y-=this.speed;
				this.direct=0;
			}
		}
		this.moveRight=function(){
			if(this.x+30<400){
				this.x+=this.speed;
				this.direct=1;
			}
		}
		this.moveDown=function(){
			if(this.y+30<300){
				this.y+=this.speed;
				this.direct=2;
			}
		}
		this.moveLeft=function(){
			if(this.x>0){
				this.x-=this.speed;
				this.direct=3;
			}
		}
		this.shootenemy=function(){
			switch(this.direct){
				case 0:
					heroBullet=new Bullet(this.x+9,this.y,this.direct,"hero",this);
				break;
				case 1:
					heroBullet=new Bullet(this.x+30,this.y+9,this.direct,"hero",this);
				break;
				case 2:
					heroBullet=new Bullet(this.x+9,this.y+30,this.direct,"hero",this);
				break;
				case 3:
					heroBullet=new Bullet(this.x,this.y+9,this.direct,"hero",this);
				break;
			}
			heroBullets.push(heroBullet);//push到数组中
			//下面这个感觉有点像是php的用法
			var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
			//把这个timer赋给这个子弹
			heroBullets[heroBullets.length-1].timer=timer;
		}
	}
	function EnemyTank(x,y,direct,color){
		this.tank=Tank;
		this.tank(x,y,direct,color);
		delete this.tank;
		this.count=0;
		this.BulletLive=true;
		this.run=function(){
			switch(this.direct){
				case 0:
					if(this.y>0){
						this.y-=this.speed;
				}break;
				case 1:
					if(this.x+30<400){
					this.x+=this.speed;
				}break;
				case 2:
					if(this.y+30<300){
					this.y+=this.speed;
				}break;
				case 3:
					if(this.x>0){
					this.x-=this.speed;
				}break;

			}
			if(this.count>30){//初步设定走30步就变换方向
				this.direct=Math.round(Math.random()*3);//随机改变方向
				this.count=0;
			}
			else{
				this.count++;
			}
			if(this.BulletLive==false){//创建新的敌方坦克的子弹
				switch(this.direct){
					case 0:
						eBullet=new Bullet(this.x+9,this.y,this.direct,"enemy",this);
					break;
					case 1:
						eBullet=new Bullet(this.x+30,this.y+9,this.direct,"enemy",this);
					break;
					case 2:
						eBullet=new Bullet(this.x+9,this.y+30,this.direct,"enemy",this);
					break;
					case 3:
						eBullet=new Bullet(this.x,this.y+9,this.direct,"enemy",this);
					break;
				}
				enemyBullets.push(eBullet);
				var timer=window.setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
				//把这个timer赋给这个子弹
				enemyBullets[enemyBullets.length-1].timer=timer;
				this.BulletLive=true;//创建成功
			}
		}
	}
	//画出英雄坦克的子弹
	function drawHeroBullet(){
		for(var i=0;i<heroBullets.length;i++){
			var heroBullet=heroBullets[i];
				if(heroBullet!=null&&heroBullet.isLive){
					cxt.fillStyle="#FEF26E";
					cxt.fillRect(heroBullet.x,heroBullet.y,2,2);
				}
			}

		}
	//画出地方坦克的子弹，一样的，但是颜色不一样，这里分开写方便一点，综合的话要传入坦克类型和颜色
	function drawEnemyBullet(){
		for(var i=0;i<enemyBullets.length;i++){
			var enemyBullet=enemyBullets[i];
				if(enemyBullet!=null&&enemyBullet.isLive){
					cxt.fillStyle="#00FEFE";
					cxt.fillRect(enemyBullet.x,enemyBullet.y,2,2);
				}
			}

		}
	function drawTank(tank){
		if(tank.isLive){
			switch(tank.direct){
				case 0:case 2://上下
					cxt.fillStyle=tank.color[0];
					cxt.fillRect(tank.x,tank.y,5,30);//左边的齿轮
					cxt.fillRect(tank.x+15,tank.y,5,30);//右边的齿轮
					cxt.fillRect(tank.x+6,tank.y+5,8,20);//中间的部分
					cxt.fillStyle=tank.color[1];//主体颜色
					cxt.beginPath();
					cxt.arc(tank.x+10,tank.y+15,4,0,360,false);//圆形盖子
					cxt.closePath();
					cxt.fill();//圆形填充

					cxt.strokeStyle=tank.color[1];//炮筒颜色
					cxt.lineWidth=1.5;//线条宽度
					cxt.beginPath();//开始路径
					cxt.moveTo(tank.x+10,tank.y+15);//起点坐标
					if(tank.direct==0){
						cxt.lineTo(tank.x+10,tank.y);//终点坐标
					}else if(tank.direct==2){
						cxt.lineTo(tank.x+10,tank.y+30);
					}
					cxt.closePath();//结束路径
					cxt.stroke();//划线，填充用fill
				break;
				case 1:case 3://左右
					cxt.fillStyle=tank.color[0];
					cxt.fillRect(tank.x,tank.y,30,5);//左边的齿轮
					cxt.fillRect(tank.x,tank.y+15,30,5);//右边的齿轮
					cxt.fillRect(tank.x+5,tank.y+6,20,8);//中间的部分
					cxt.fillStyle=tank.color[1];//主体颜色
					cxt.beginPath();
					cxt.arc(tank.x+15,tank.y+10,4,0,360,false);//圆形盖子
					cxt.closePath();
					cxt.fill();//圆形填充

					cxt.strokeStyle=tank.color[1];//炮筒颜色
					cxt.lineWidth=1.5;//线条宽度
					cxt.beginPath();//开始路径
					cxt.moveTo(tank.x+15,tank.y+10);//起点坐标
					if(tank.direct==1){
						cxt.lineTo(tank.x+30,tank.y+10);//终点坐标
					}else if(tank.direct==3){
						cxt.lineTo(tank.x,tank.y+10);
					}
					cxt.closePath();//结束路径
					cxt.stroke();//划线，填充用fill
				break;
			}
		}
	}
//判断是否集中步骤：选中一颗子弹，在选中一辆坦克，这里要根据子弹的方向判断子弹是不是在坦克的范围内，如果在范围内
//就表示击中，切换爆炸效果，并且删除该子弹和坦克
function isHitTank(){
	//先判断是否击中敌方坦克
	for(var i=0;i<heroBullets.length;i++){
		var heroBullet=heroBullets[i];
		if(heroBullet.isLive){
			for(var j=0;j<enemytanks.length;j++){
				var enemytank=enemytanks[j];
				if(enemytank.isLive){
					switch(enemytank.direct){
						case 0:case 2:
							if((heroBullet.x>=enemytank.x&&heroBullet.x<=enemytank.x+20)&&
							(heroBullet.y>=enemytank.y&&heroBullet.y<=enemytank.y+30)){
							//子弹在坦克范围内表示击中
								heroBullet.isLive=false;
								enemytank.isLive=false;
								enemytanks.splice(j,1);
								//这里以后还要切换爆炸效果
								var bomb=new Bomb(enemytank.x,enemytank.y);
								bombs.push(bomb);
							}break;
						case 1:case 3:
							if((heroBullet.x>=enemytank.x&&heroBullet.x<=enemytank.x+30)&&
							(heroBullet.y>=enemytank.y&&heroBullet.y<=enemytank.y+20)){
							//子弹在坦克范围内表示击中
								heroBullet.isLive=false;
								enemytank.isLive=false;
								enemytanks.splice(j,1);
								//这里以后还要切换爆炸效果
								var bomb=new Bomb(enemytank.x,enemytank.y);//这货就是爆炸效果的对象
								bombs.push(bomb);//防止同时多个爆炸，还是存到数组里
							}break;
					}
				}
			}
		}
	}
	//判断英雄是否被击中
	for(var k=0;k<enemyBullets.length;k++){
		var enemyBullet=enemyBullets[k];
		if(enemyBullet.isLive){
			switch(hero.direct){
				case 0:case 2:
					if((enemyBullet.x>=hero.x&&enemyBullet.x<=hero.x+20)&&
						(enemyBullet.y>=hero.y&&enemyBullet.y<=hero.y+30)){
					//window.alert("英雄已死，游戏结束");
					hero.isLive=false;
					gameover=true;
					enemyBullet.isLive=false;
					var bomb=new Bomb(hero.x,hero.y);
					bombs.push(bomb);
				}break;
				case 1:case 3:
					if((enemyBullet.x>=hero.x&&enemyBullet.x<=hero.x+30)&&
						(enemyBullet.y>=hero.y&&enemyBullet.y<=hero.y+20)){
					//window.alert("英雄已死，游戏结束");
					hero.isLive=false;
					gameover=true;
					enemyBullet.isLive=false;
					var bomb=new Bomb(hero.x,hero.y);
					bombs.push(bomb);
				}break;
			}
		}
	}
}
function drawBomb(){
	for(var i=0;i<bombs.length;i++){
		var bomb=bombs[i];
		if(bomb.isLive){
			if(bomb.blood>6){//爆炸初期，显示第一张图片
				var img1=new Image();
				img1.src="bomb_1.gif";
				img1.onload=function(){
					cxt.drawImage(img1,bomb.x,bomb.y,30,30);
				}
			}else if(bomb.blood>3){
				var img2=new Image();
				img2.src="bomb_2.gif";
				img2.onload=function(){
					cxt.drawImage(img2,bomb.x,bomb.y,30,30);
				}
			}else{
				var img3=new Image();
				img3.src="bomb_3.gif";
				img3.onload=function(){
					cxt.drawImage(img3,bomb.x,bomb.y,30,30);
				}
			}
			bomb.bloodDown();
			if(bomb.blood<=0){
				bombs.splice(i,1);//删除这个爆炸效果
			}
		}
	}
}
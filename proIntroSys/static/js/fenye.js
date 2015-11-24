/**
 * Created by ykz on 2014/8/9.
 */
function page(opt){
    if(!opt.id){return false;}//没有取到id的话就可以直接down了
    var obj = document.getElementById(opt.id);//获取对象
    var nowpage=opt.nowpage || 1;//获取当前页码，或者直接默认为1
    var allpage=opt.allpage || 5;//获取总的页面，或者默认为5

    if(allpage>=6 && nowpage>=4){//总页码大于6或者当前页码大于4的时候才会出现首页字符
        var oa=document.createElement('a');
        var oLi=document.createElement('li');
        oa.href = '#' + 1;
        oa.innerHTML="首页";
        oLi.appendChild(oa);
        obj.appendChild(oLi);
    }
    if(nowpage>=2){//当前页码大于2的时候就出现上一页
        var oa=document.createElement('a');
        var oLi=document.createElement('li');
        oa.href = '#' + (nowpage-1);
        oa.innerHTML="上一页";
        oLi.appendChild(oa);
        obj.appendChild(oLi);
    }
    if(allpage<=5){//总的页面小于5的时候直接把所有的页码都打出来就行了，没那么多废话
        for (var i = 1; i <= allpage; i++) {
            var oa = document.createElement('a');
            var oLi=document.createElement('li');
            oa.href = '#' + i;
            oa.innerHTML=i;
            if (i == nowpage) {
                oLi.className="active";
            }
            oLi.appendChild(oa);
            obj.appendChild(oLi);
        }
    }else{//总页码超过5的话，默认只出现5个页码，以当前页码为中心，向前两个，向后两个
        for(var i=1;i<=5;i++){
            var oa=document.createElement('a');
            var oLi=document.createElement('li');
            if (nowpage == 1 || nowpage == 2) {//如果当前页码为1或者2的话，也打印5个页码，但是不能向前出现打2个页码了
                oa.href = '#' + i;
                oa.innerHTML=i;
                if (nowpage == i) {
                    oLi.className="active";
                }
                oLi.appendChild(oa);
                obj.appendChild(oLi);
            }else if((allpage-nowpage)==1||(allpage-nowpage)==0){//当前页码为最后两个页码的时候，和前面类似
                oa.href='#'+(allpage-5+i);
                oa.innerHTML=(allpage-5+i);
                if((allpage-nowpage==0)&&i==5){
                    oLi.className="active";
                }else if((allpage-nowpage==1)&&i==4){
                    oLi.className="active";
                }
                oLi.appendChild(oa);
                obj.appendChild(oLi);
            }
            else {
                oa.href = '#' + (nowpage - 3 + i);//好吧，最普遍的情况，以当前为中心，+-2个页码就可以了，注意的是，当前页码没有中括号
                oa.innerHTML=(nowpage-3+i);
                if (i == 3) {
                    oLi.className="active";
                }
                oLi.appendChild(oa);
                obj.appendChild(oLi);
            }
        }
    }
    if((allpage-nowpage>=3)&&allpage>=6){//如果总页码超过6，并且当前页码为倒数第三个以后的话出现尾页
        var oa=document.createElement('a');
        var oLi=document.createElement("li");
        oa.href = '#' + allpage;
        oa.innerHTML="尾页";
        oLi.appendChild(oa);
        obj.appendChild(oLi);
    }
    if((allpage-nowpage>=1)){//只要不是最后一页，就出现下一页
        var oa=document.createElement('a');
        var oLi=document.createElement("li");
        oa.href = '#' + (nowpage+1);
        oa.innerHTML="下一页";
        oLi.appendChild(oa);
        obj.appendChild(oLi);
    }
    opt.callback(nowpage,allpage);//判断完哪个页码的话，调用一下函数，这里就简单弹出当前页码和总的页码，要是加入操作的话最好就在这个函数做手脚
    var aA=obj.getElementsByTagName('a');
    for(var i=0;i<aA.length;i++){//给每个页码都添加分页函数
        aA[i].onclick=function(){
            var nowpage = parseInt(this.getAttribute('href').substring(1));//获取当前页码数
            obj.innerHTML='';//将当前div里边已经打印的页码清空，然后在打出页码就行了，类似于刷新
            page({
                id:opt.id,
                nowpage:nowpage,
                allpage:opt.allpage,
                callback:opt.callback
            });
            return false;
        };
    }
}
/**
 * Created by ykz on 2015/6/27.
 */

/**
 * 生成固定范围内的随机数
 * @param start
 * @param end
 * @return {int} random number
 */
function getRandom(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}
/**
 * 生成count个商品对象
 * 对象属性包括：{int}对象id,{array}关联对象id,{int}天气关联代码
 * @param count
 * @returns {Array}
 */
function initGoods(count) {
    var res = [];
    var i = 0, j = 0;
    var len = 0;

    for (; i < count; i++) {
        var obj = {
            id: 0,
            associatedGoods: [],
            weather: 0,
            sim:0
        };
        obj.id = i + 1;
        obj.weather = getRandom(1, 5);//天气状况为随机1-5 代表阴晴雨雪风
        len = getRandom(3, 5);//关联商品为3-5个随机
        for (j = 0; j < len; j++) {
            obj.associatedGoods[j] = getRandom(1, 1000);
        }
        res.push(obj);
    }
    return res;
}
/**
 * 生成count个用户对象
 * 属性包括：
 * 用户id:int
 * 地理位置：array int x,int y
 * 购买记录：array 0-5个 商品id
 * 购买意向 int 商品id
 * 关联用户 待定
 * @param count
 * @returns {Array}
 */
function initUsers(count) {
    var res = [];
    var i, j;
    var len;

    for (i = 0; i < count; i++) {
        var obj = {
            id: 0,
            position: {
                x: 0,
                y: 0
            },
            buyRecord: [],
            buying: 0,
            associatedUsers: []
        };
        obj.id = i + 1;
        obj.position = {
            x: getRandom(1, 1000),
            y: getRandom(1, 1000)
        };
        len = getRandom(5, 8);
        for (j = 0; j < len; j++) {
            obj.buyRecord[j] = getRandom(1, 1000);
        }
        //obj.buying = getRandom(1,1000);
        //obj.associatedUsers = [];
        res.push(obj);
    }
    return res;
}

/**
 * 数组去重
 * @param arr
 * @returns {Array}
 */
function arrayUnique(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) == -1) {
            res.push(arr[i]);
        }
    }
    return res;
}
$(function () {
    var allGoodsCount = 1000;
    var allUsersCount = 1000;
    var allGoods = initGoods(allGoodsCount);//生成1000个商品和1000个用户
    var allUsers = initUsers(allUsersCount);
    var distance = 400;
    var i, j, len;

    var $inputRecord = $(".inputRecord");
    var $inputX = $('.inputX');
    var $inputY = $('.inputY');
    var $inputWeather = $('.inputWeather');
    var $inputDistance = $('.inputDistance');
    var $inputRecordGoods = $('.inputRecordGoods');
    var $hiddenTr = $('.hiddenTr');
    var $resTbody = $('.resTbody');

    var $testA = $('#testa');
    $testA.on('click', function(){
        console.log('test');
        return false;
    });
    //current user
    var currentUser = initUsers(1)[0];
    currentUser.id = getRandom(1, allUsersCount);
    currentUser.buying = getRandom(1, allGoodsCount);
    var currentWeather = getRandom(1, 5);
    //currentUser.buyRecord = $inputRecord.val().split(/\s+/);

    //以下信息为输入，但是这里使用随机生成的模式，显示在页面中
    $inputRecord.val(currentUser.buyRecord.join(','));
    $inputX.val(currentUser.position.x);
    $inputY.val(currentUser.position.y);
    $inputWeather.val(currentWeather);
    $inputDistance.val(distance);
    //console.log(currentUser);

    //当前用户的购买记录相关的商品
    var userAssoRecordGoods = [];
    for (i = 0, len = currentUser.buyRecord.length; i < len; i++) {
        userAssoRecordGoods = userAssoRecordGoods.concat(allGoods[currentUser.buyRecord[i] - 1].associatedGoods);
    }
    $inputRecordGoods.val(arrayUnique(userAssoRecordGoods).sort(function (val1, val2) {
        return val1 - val2;
    }).join(','));

    //距离近的用户
    var nearUsers = allUsers.filter(function (item, index) {
        return Math.pow(item.position.x - currentUser.position.x, 2) + Math.pow(item.position.y - currentUser.position.y, 2) < Math.pow(distance, 2);
    });
    console.log("近距离用户个数");
    console.log(nearUsers.length);

    //相似度高的用户
    var assoUsers = nearUsers.filter(function (item, index) {
        var currentRecord = currentUser.buyRecord;
        //尝试将相似度高定位为：购买记录有相同的，和与购买记录关联的有相同的
        currentRecord=currentRecord.concat(userAssoRecordGoods);
        for (i = 0, len = currentRecord.length; i < len; i++) {
            if (item.buyRecord.indexOf(currentRecord[i]) != -1) {
                return true;
            }
        }
        return false;
    });
    console.log('相似度高的用户');
    console.log(assoUsers.length);
    //nearUsers = assoUsers;

    //获取近距离且相似度高的用户的购买记录
    var nearBuyed = [];
    assoUsers.map(function (item, index) {
        nearBuyed = nearBuyed.concat(item.buyRecord);
    });
    nearBuyed = arrayUnique(nearBuyed).sort(function (val1, val2) {
        return val1 - val2;
    });
    console.log("近距离且相似度高用户的购买记录");
    console.log(nearBuyed.length);

    //适合天气的商品
    var weatherEqual = nearBuyed.filter(function (item, index) {
        return allGoods[item - 1].weather == currentWeather;
    });
    console.log('天气情况适合的商品');
    console.log(weatherEqual);

    //删除当前用户已有的购买记录中的商品
    var delRepeatGoods = weatherEqual.filter(function (item, index) {
        var currentRecord = currentUser.buyRecord;
        for (i = 0, len = currentRecord.length; i < len; i++) {
            if (item == currentRecord[i]) {
                return false;
            }
        }
        return true;
    });

    /*console.log('当前用户的购买记录');
    console.log(currentUser.buyRecord);
    console.log('最终生成的推荐列表');
    console.log(finalRecomGoods);*/

    var assoGoods = currentUser.buyRecord.concat(userAssoRecordGoods);
    var finalRecomGoods = delRepeatGoods.filter(function(item,index){
        for(i=0,len=assoGoods.length;i<len;i++){
            if(assoGoods.indexOf(item)!=-1){
                allGoods[item-1].sim = getRandom(5,9);
                return true;
            }else{
                for(j=0;j<allGoods[item-1].associatedGoods.length;j++){
                    if(assoGoods.indexOf(allGoods[item-1].associatedGoods[j])!=-1){
                        allGoods[item-1].sim = getRandom(1,4);
                        return true;
                    }
                }
            }
        }
        return false;
    });

    for (i = 0, len = finalRecomGoods.length; i < len; i++) {
        var currentGoods = allGoods[finalRecomGoods[i] - 1];
        $hiddenTr.clone().removeClass().children("td").eq(0).html(currentGoods.id).end().eq(1).html(currentGoods.associatedGoods.join(',')).end().eq(2).html(currentGoods.weather).end().eq(3).html(currentGoods.sim).end().end().appendTo($resTbody);
    }

    //图表显示的相关配置
    var myChart = echarts.init(document.getElementById('charts'));
    option = {
        title : {
            text: '品牌推荐结果',
            subtext: '模拟数据'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            x : 'center',
            data:['联想','惠普','宏基','华硕']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        polar : [
            {
                indicator : [
                    {text : '性能', max  : 100},
                    {text : '重量', max  : 100},
                    {text : '外观', max  : 100},
                    {text : '待机时长', max  : 100},
                    {text : '价格', max  : 100},
                    {text : '售后', max  : 100}
                ],
                radius : 130
            }
        ],
        series : [
            {
                name: '完全模拟数据',
                type: 'radar',
                /*itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },*/
                data : [
                    {
                        value : [97, 42, 88, 94, 90, 86],
                        name : '联想'
                    },
                    {
                        value : [97, 32, 74, 95, 88, 92],
                        name : '惠普'
                    },
                    {
                        value : [88, 35, 92, 90, 85, 96],
                        name : '宏基'
                    },
                    {
                        value : [98, 52, 85, 90, 92, 88],
                        name : '华硕'
                    }
                ]
            }
        ]
    };
    myChart.setOption(option);
    myChart.on(echarts.config.EVENT.CLICK, function(){
        console.log('click');
    });

});
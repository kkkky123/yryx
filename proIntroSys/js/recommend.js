/**
 * Created by ykz on 2015/6/27.
 */

/**
 *
 * @param start
 * @param end
 * @return {int} random number
 */
function getRandom(start, end) {
    return Math.round(Math.random() * (end - start) + start);
}
/**
 * 生成count个商品对象
 * 对象属性包括：{int}对象id,{array}关联对象id,{int}天气关联代码,
 * return 商品对象数组
 * @param count
 */
function initGoods(count) {
    var res = [];
    var i = 0, j = 0;
    var len = 0;

    for (; i < count; i++) {
        var obj = {
            id: 0,
            associatedGoods: [],
            weather: 0
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
 * return 用户对象数组
 * @param count
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

/**/
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

    //current user
    var currentUser = initUsers(1)[0];
    currentUser.id = getRandom(1, allUsersCount);
    currentUser.buying = getRandom(1,allGoodsCount);
    //console.log(currentUser);

    //距离近的用户
    var distance = 100;
    var nearUsers = allUsers.filter(function (item, index) {
        return Math.pow(item.position.x - currentUser.position.x, 2) + Math.pow(item.position.y - currentUser.position.y, 2) < Math.pow(distance, 2);
    });
    //console.log(nearUsers);

    //相似度高的用户
    /*var assoUsers = nearUsers.filter(function(item,index){
     return currentUser.id in item.b
     });*/

    //获取近距离用户的购买记录
    var nearBuyed = [];
    nearUsers.map(function (item, index) {
        nearBuyed = nearBuyed.concat(item.buyRecord);
    });
    nearBuyed = arrayUnique(nearBuyed).sort(function(val1,val2){
        return val1-val2;
    });
    //console.log(nearBuyed.length);

    //天气适合的商品
    var currentWeather = getRandom(1, 5);
    var weatherEqual = nearBuyed.filter(function(item,index){
        return allGoods[item].weather == currentWeather;
    });
    //console.log(weatherEqual.length);

    console.log(currentUser.buying);
    console.log(currentUser.buyRecord);
    console.log(weatherEqual);
});
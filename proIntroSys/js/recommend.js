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
 * ����count����Ʒ����
 * �������԰�����{int}����id,{array}��������id,{int}������������,
 * return ��Ʒ��������
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
        obj.weather = getRandom(1, 5);//����״��Ϊ���1-5 ����������ѩ��
        len = getRandom(3, 5);//������ƷΪ3-5�����
        for (j = 0; j < len; j++) {
            obj.associatedGoods[j] = getRandom(1, 1000);
        }
        res.push(obj);
    }
    return res;
}
/**
 * ����count���û�����
 * ���԰�����
 * �û�id:int
 * ����λ�ã�array int x,int y
 * �����¼��array 0-5�� ��Ʒid
 * �������� int ��Ʒid
 * �����û� ����
 * return �û���������
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
    var allGoods = initGoods(allGoodsCount);//����1000����Ʒ��1000���û�
    var allUsers = initUsers(allUsersCount);

    //current user
    var currentUser = initUsers(1)[0];
    currentUser.id = getRandom(1, allUsersCount);
    currentUser.buying = getRandom(1,allGoodsCount);
    //console.log(currentUser);

    //��������û�
    var distance = 100;
    var nearUsers = allUsers.filter(function (item, index) {
        return Math.pow(item.position.x - currentUser.position.x, 2) + Math.pow(item.position.y - currentUser.position.y, 2) < Math.pow(distance, 2);
    });
    //console.log(nearUsers);

    //���ƶȸߵ��û�
    /*var assoUsers = nearUsers.filter(function(item,index){
     return currentUser.id in item.b
     });*/

    //��ȡ�������û��Ĺ����¼
    var nearBuyed = [];
    nearUsers.map(function (item, index) {
        nearBuyed = nearBuyed.concat(item.buyRecord);
    });
    nearBuyed = arrayUnique(nearBuyed).sort(function(val1,val2){
        return val1-val2;
    });
    //console.log(nearBuyed.length);

    //�����ʺϵ���Ʒ
    var currentWeather = getRandom(1, 5);
    var weatherEqual = nearBuyed.filter(function(item,index){
        return allGoods[item].weather == currentWeather;
    });
    //console.log(weatherEqual.length);

    console.log(currentUser.buying);
    console.log(currentUser.buyRecord);
    console.log(weatherEqual);
});
/**
 * Created by ykz on 2015/2/7.
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
$(function () {
    //客户端检测表单
    var $oPassword = $("#oPassword"),
        $newPassword = $("#newPassword"),
        $newPassword2 = $("#newPassword2"),
        $save = $("#save"),
        $form = $("form");
    /*服务器端检测输入密码的正确性*/
    var errno = getQueryString(errno);
    if (errno == "1") {
        $oPassword.val("").next("p").html("旧密码输入错误。请重新输入");
    } else if (errno == "2") {

    }
    /*客户端检测表单输入是否合法*/
    $save.on("click", function () {
        var oldPassVal = $oPassword.val(),
            newPassVal = $newPassword.val(),
            newPassVal2 = $newPassword2.val();
        var isSubmit = true;
        if (oldPassVal.length == 0) {
            $oPassword.next("p").html("请输入旧密码");
            isSubmit = false;
        } else {
            $oPassword.next("p").html("");
        }
        if (newPassVal.length == 0) {
            $newPassword.next("p").html("新密码不能为空");
            isSubmit = false;
        } else {
            $newPassword.next("p").html("");
        }
        if (newPassVal2.length == 0) {
            $newPassword2.next("p").html("请再次输入新密码");
            isSubmit = false;
        } else {
            $newPassword2.next("p").html("");
        }
        if (newPassVal == newPassVal2) {
            $newPassword2.next("p").html("");
        } else {
            $newPassword2.next("p").html("两次密码不同");
            isSubmit = false;
        }
        if (isSubmit) {
            $form.submit();
        }
    });
});
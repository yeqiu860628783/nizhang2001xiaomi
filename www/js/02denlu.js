$("#beian>img").on("click", function () {
    open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134')
})

$("#btn").click(function () {
    $.post(
        "loginCheck.php", {
            "username": $("#username").val(),
            "userpass": $("#userpass").val()
        },
        function (obj) {
            if (obj.status == "1") {
               open("03index.html")
            } else if (obj.status == "0") {
                alert("登录失败，账号或密码错误")
            }
        },
        "json"
    );
});
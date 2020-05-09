//验证通过才能提交
$("#f").on('submit', function (event) {
    if (isUser() && isPass()) {

    } else {
        let e = event || window.event
        e.preventDefault()
    }
})

//账号框失焦验证
$("#username").on("blur", function () {
    if (isUser()==true){
        $.ajax({
            context: $(".p"),
            url:"checkUser.php",
            data:{
            "username": this.value
            },
            beforeSend:()=>{
                $(".wait1").css({"display":"block"});
            },
            success: function (str){
                if (str == "1") {
                    $(".p").html("x,已有用户抢先注册")
                } else if (str == "0") {
                    $(".p").html("亲，趁着还没人用，赶紧注册！")
                } else {
                    $(".p").html("服务器出错了")
                }
            },
            complete:()=>{
                $(".wait1").css({"display":"none"});
            }
        })
    }
})

//账号框点击清空
$("#username").on('focus', function () {
    $(".s1").html('')
})

//密码框失焦验证
$("#userpass").on("blur", function () {
    isPass();
})

//密码框点击清空
$("#userpass").on("focus", function () {
    $('.s2').html("")
})

// 验证账号是否正确
function isUser() {
    // 数字，字母，下划线组成，不能以数字开头，6-16位
    var reg = /^[_a-zA-Z]\w{5,15}$/;
    if (reg.test($("#username").val())) {
        $(".s1").html("√")
        return true;
    } else {
        $(".s1").html("×,不能以数字开头且6-16位")
        return false;
    }
}

// 验证密码是否正确
function isPass() {
    //6-16位数字和字母
    var reg = /^[\da-zA-Z]{6,16}$/;
    if (reg.test($("#userpass").val())) {
        $('.s2').html("√")
        return true;
    } else {
        $('.s2').html("×，6-16位数字和字母")
        return false;
    }
}

//密码可见
$("#em").click(function () {
    $("#userpass").attr("type", "text")
    em.style.display = "none"
    em1.style.display = "inline-block"
})

//密码隐藏
$("#em1").click(function () {
    $("#userpass").attr("type", "password")
    em.style.display = "inline-block"
    em1.style.display = "none"
})

//注册验证
$("#btnReg").click(function () {
    if ($("#username").val() == "" || $("#userpass").val() == "") {
        alert(" 亲,你什么都还没有输入呢");
        return
    }
    $.ajax({
        url:"regSave.php",
        type:"POST",
        data:{
            "username": $("#username").val(),
            "userpass": $("#userpass").val()
        },
        beforeSend:()=>{
            $(".wait").css({"display":"block"});
        },
        success:function(str){
            if(str=="1"){ //注册成功
                open("02denlu.html")
            }else if(str=="0"){
                alert("不好意思，注册失败，请重新注册");
            }
        },
        complete:()=>{
            $(".wait").css({"display":"none"});
        }
    })
});

//跳转事件
$('.xieye').on("click", function () {
    open("https://static.account.xiaomi.com/html/agreement/user/zh_CN.html")
})

$('.yingsi').on("click", function () {
    open("https://privacy.mi.com/miaccount/zh_CN/")
})

$("#beian").on("click", function () {
    open('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134')
})

//密码强度
$("#userpass").keyup(function(){
    if (isPass()){
        $(".qiangdu").css("display","block")
    
        var regNum = /^\d{6,16}$/; //纯粹的数字
        var regLetter = /^[a-zA-Z]{6,16}$/; //纯粹的字母
        var regNumAndLetter = /^[0-9a-zA-Z]{6,16}$/; //6-16位的数字或者字母都行； 16个字母。
        
        if(regNum.test(this.value) || regLetter.test(this.value)){
            $(".qiangdu").css("display", "block").html("中")
        }else if(regNumAndLetter.test(this.value)){
            $(".qiangdu").css({
                "display":"block",
                "backgroundColor":"#fd7f2b",
            }).html("强")
        }
    }else {
        $(".qiangdu").css("display", "none")
    }
})
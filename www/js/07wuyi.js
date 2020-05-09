// 当前播放的图片的序号
let ord = 0;
// 定义定时器
let myTimer = null;
let $img = $(".img>img");
let $li = $(".dian>a");
let t = true
function autoPlay() {
    if(t== true){
        myTimer = setInterval(function () {
            // 跳转到下一张图片上
            goImg(ord + 1);
        }, 4000);
    }
}
// 跳转到指定的图片上（transOrd就是要跳转的图片的序号）
function goImg(transOrd) {
    t = false
    // 一、数据的合法性处理
    if (transOrd == ord) {
        return; //结束函数执行
    }
    // 二、逻辑
    // 1、数据处理
    // outOrd是淡出的图片序号，transOrd是要淡入的图片序号（即：跳转的图片序号）
    let outOrd = ord;
    ord = transOrd;

    // 2、边界处理
    if (ord > $img.length - 1) {
        ord = 0;
    } else if (ord < 0) {
        ord = $img.length - 1;
    }
    //3、外观：
    // 3.1）、让一张图片淡出，一张图片淡入
    $img.eq(outOrd).animate({
        "opacity": 0
    }, 1000);
    $img.eq(ord).animate({
        "opacity": 1
    }, 1000);
    // 3.2）、变豆豆
    $li.eq(outOrd).css({
        "border-color": "hsla(0, 0%, 100%, .3)",
        "background": "rgba(0, 0, 0, .4)"
    });
    $li.eq(ord).css({
        "background": "hsla(0, 0%, 100%, .4)",
        "border-color": "rgba(0, 0, 0, .4)"
    });
    return t = true
}
function stopPlay() {
    window.clearInterval(myTimer);
    myTimer = null;
}

$(function () {
    //1、自动播放
    autoPlay();

    //2、点击豆豆跳转到对应的图片上
    $(".dian>a").click(function () {
        stopPlay();
        goImg($(this).index());
    });

    //3、鼠标放入停止
    $("#imgBox").mouseover(function () {
        stopPlay();
    });

    //4、鼠标离开继续播放    
    $("#imgBox").mouseout(function () {
        autoPlay();
    });

    //5、左右箭头
    let $span = $("#imgBox>span");
    // 左箭头
    $span.eq(1).click(function () {
        stopPlay();
        goImg(ord - 1);
    });
    // 右箭头
    $span.eq(0).click(function () {
        stopPlay();
        goImg(ord + 1);
    });
    $img.click(function(){
        open("04shangping.html")
    })

    //回顶
    window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t >= 800) {
            $(".huidin").css("display","block")
        } else if (t < 800) {
            $(".huidin").css("display", "none")
        }
    }

    
    let tab = $(".banner_con>ul>li")
    let nub = 1
    for(let i=0;i<10;i++){
        tab.eq(i).mouseover(function () {
            nub += 1
            $(".banner_con>ol").css("z-index", "1000");
            $(".banner_con>ol>li").eq(i).css("opacity", "1");
            $(".banner_con>ol>li").eq(i).css("z-index", nub);
        })
        tab.mouseout(function () {
            $(".banner_con>ol").css("z-index", "-1");
            $(".banner_con>ol>li").eq(i).css("opacity", "0");
        })
    }
    $(".banner_con>ol>li").mouseover(function () {
        $(".banner_con>ol").css("z-index", "1000");
        $(this).css("opacity", "1");
    })
    $(".banner_con>ol>li").mouseout(function () {
        $(".banner_con>ol").css("z-index", "-1");
        $(this).css("opacity", "0");
    })

    $(".clc").click(function () {
        open('04shangping.html')
    })
    $(".cl").click(function(){
        open('05spleibiao.html')
    })
    $(".gw").click(function () {
        open("06gowuche.html")
    })
})




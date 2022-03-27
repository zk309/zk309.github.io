/*
 * @Descripttion: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @version: April 2021 (version 1.56)
 * @Author: ZhangKe
 * @Date: 2022-03-26 19:19:18
 * @LastEditors: ZhangKe
 * @LastEditTime: 2022-03-27 09:42:12
 * @FilePath: \11-品优购案例\shoping\js\navigation.js
 */
$(function() {

    // alert(1);
    var recomTop = parseInt($(".recom").offset().top);
    // console.log(recomTop); // 660

    // 5. 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 核心: 节流阀  互斥锁 
    var flag = true;

     // 1.显示隐藏电梯导航
    $(window).scroll(function () {
        // console.log($(document).scrollTop());
        toggleTool();

        // 4. 滑动页面, 电梯导航自动添加 current 类样式
        // 核心: $(ele).each() 
        // 判断条件: 被卷去的头部 >= 内容区域里面每个模块的 offset().top
        if (flag) { // 节流阀  互斥锁 
            $(".floor .w").each(function(i, ele) {
                if (parseInt($(document).scrollTop()) >= parseInt($(ele).offset().top)) {
                    $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass();
                }
            })
        }
    });
    toggleTool();
    function toggleTool() {
        if (parseInt($(document).scrollTop()) >= recomTop) {
            $(".fixedtool").fadeIn(500);
        } else {
            $(".fixedtool").fadeOut(500);
        }
    }

    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        flag = false; // 节流阀  互斥锁 
        var index = $(this).index();
        var distance = parseInt($(".floor .w").eq(index).offset().top);
        // 自定义动画 animated, 注意只能元素做动画.
        $('html, body').stop().animate({
            scrollTop: distance
        }, 1000 , function() {
            flag = true; // 节流阀  互斥锁 
        });

        // 3. 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).addClass("current").siblings("li").removeClass();
    })
})
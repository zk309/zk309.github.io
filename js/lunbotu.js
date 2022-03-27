/*
 * @Descripttion: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @version: April 2021 (version 1.56)
 * @Author: ZhangKe
 * @Date: 2022-02-18 08:14:57
 * @LastEditors: ZhangKe
 * @LastEditTime: 2022-03-26 18:26:18
 * @FilePath: \11-品优购案例\shoping\js\index.js
 */
// console.log(1);

window.addEventListener('load', function() {

    // 轮播图 (原生写法)
    // 1. 获取元素
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var ul = focus.querySelector('ul');
    var ul_bg = ul.querySelector('img'); 
    var bg = ul_bg.offsetWidth;// 轮播图背景图片的宽度
    var ol = focus.querySelector('ol');
    var num = 0; // 右侧按钮 和 左侧按钮 的滚动控制器
    var circle = 0; // 小圆圈的滚动控制器
    var flag = true; // 节流阀控制器

    // 1. 鼠标经过和离开, 左右箭头显示和隐藏.
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 11. 鼠标经过, 停止定时器; 鼠标离开, 开始自动播放.
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 11. 鼠标经过, 停止定时器; 鼠标离开, 开始自动播放.
        timer = setInterval(function() {
            arrow_r.click();
        },1500);
    });

    // 2. 动态生成小圆圈
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('data-index', i);

        // 3. 利用排他思想, 给点击的小圆圈添加 .current 类样式.
        // 给每个 li 添加一个点击事件, 这里是回调函数.
        li.addEventListener('click', function(evt) {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            // 4. 点击小圆圈, 切换广告图片.
            // 思路: animated.js + 定位 + 索引号 
            // 给每个 li, 添加 index 属性.
            // 给 ul 添加定位 absolute
            // animate(obj, distance, callback)
            var index = this.dataset.index; // var index = this.getAttribute('data-index');
            num = index;
            circle = index;
            animate(ul, -index*bg);
        })
    }
    ol.children[0].className = 'current';
    // 7. 解决 实现无缝滚动过出来的一张图片 和 多出来的小圆圈 问题.
    // 克隆第一张图片到 ul 下, 注意写在循环小圆圈完毕之后
    var firstImg = ul.children[0].cloneNode(true);
    ul.appendChild(firstImg);

    // 5. 右侧按钮无缝滚动
    // 使用全局变量 num 
    arrow_r.addEventListener('click', function() {
        // 12. 节流阀, 为了防止轮播图按钮连续点击造成播放过快;
        // 核心实现思路: 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数;
        if (flag) {
            // 12. 核心实现思路: 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数;
            flag = false;
            // 无缝滚动
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // animate(obj, distance, callback)
            animate(ul, -num*bg, function() {
                // 12. 核心实现思路: 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数;
                flag = true;
            });

            // 8. 小圆圈随着右侧按钮变化
            // 使用全局变量 circle
            circle++;
            if (circle ==  ol.children.length) {
                circle = 0;
            }
            // 10. 相同的代码, 封装到一个函数里, 直接调用.
            circleChange(circle);
        }
        
    });
    // 6. 左侧按钮无缝滚动
    // 使用全局变量 num 
    arrow_l.addEventListener('click', function() {
        // 12. 节流阀, 为了防止轮播图按钮连续点击造成播放过快;
        // 核心实现思路: 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数;
        if (flag) {
            // 12. 核心实现思路: 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数;
            flag = false;
            // 无缝滚动
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1)*bg + 'px';
                num = ul.children.length - 1;
            }
            num--;
            // animate(obj, distance, callback)
            animate(ul, -num*bg, function() {
                // 12. 核心实现思路: 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数;
                flag = true;
            });

            // 9. 小圆圈随着左侧按钮变化 
            // 使用全局变量 circle
            circle--;
            if (circle ==  -1) {
                circle = ol.children.length-1;
            }
            // 10. 相同的代码, 封装到一个函数里, 直接调用.
            circleChange(circle);
            }
    })

    // 10. 排他思想, 封装函数
    function circleChange(circle) {
        // 排他思想, 使第 circle 被选中.
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 11. 轮播图自动播放
    // 核心: setInterval(), arrow_r.click();
    // 鼠标经过, 停止定时器; 鼠标离开, 开始自动播放.
    var timer = this.setInterval(function() {
        arrow_r.click();
    },1500);
})


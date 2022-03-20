/*
 * @Descripttion: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @version: April 2021 (version 1.56)
 * @Author: ZhangKe
 * @Date: 2022-03-18 16:15:09
 * @LastEditors: ZhangKe
 * @LastEditTime: 2022-03-18 16:39:18
 * @FilePath: \learnJavaScript\16_pc端网页特效\22_animate.js
 */

// 动画函数封装到单独 JS 文件里面

 function animate(obj, distance, callback) {
                // console.log(callback);
                // 2. 清除上一轮的定时器, 只执行一个定时器
                clearInterval(obj.timer);
                // 1. 给当前对象添加属性;
                obj.timer = setInterval(function () {
                    // 缓动动画的核心算法: (目标值 - 现在的位置) / 10 = 每次移动的距离步长
                    var step = (distance - obj.offsetLeft) / 20;

                    // 动画函数多个目标值之间移动;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    // console.log(step);

                    // 注意此处是 == 
                    if (obj.offsetLeft == distance) {
                        clearInterval(obj.timer);
                        // 回调函数写的位置: 定时器结束的位置.
                        if (callback) {
                            callback();
                        }
                    }
                    obj.style.left = obj.offsetLeft + step + 'px';
                }, 15)
            }          
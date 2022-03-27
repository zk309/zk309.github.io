/*
 * @Descripttion: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @version: April 2021 (version 1.56)
 * @Author: ZhangKe
 * @Date: 2022-03-24 19:07:21
 * @LastEditors: ZhangKe
 * @LastEditTime: 2022-03-26 10:52:38
 * @FilePath: \learnJavaScript\17_jQuery\02-购物车\js\car.js
 */
 $(function () {

            // 1. 全选 全不选功能模块
            // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
            // 事件可以使用change
            $(".checkall").change(function () {
                // 隐式迭代
                $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));

                // 7. 选中商品, 添加背景颜色
                if ($(this).prop("checked")) {
                    $(".cart-item").addClass("check-cart-item");
                } else {
                    $(".cart-item").removeClass("check-cart-item");
                }


                // 6. 计算总计和总额模块
                getSum();
            });

            // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
            $(".j-checkbox").change(function () {
                if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
                    $(".checkall").prop("checked", true);
                } else {
                    $(".checkall").prop("checked", false);
                }

                  // 7. 选中商品, 添加背景颜色
                if ($(this).prop("checked")) {
                    $(this).parents(".cart-item").addClass("check-cart-item");
                } else {
                    $(this).parents(".cart-item").removeClass("check-cart-item");
                }

                
                // 6. 计算总计和总额模块
                getSum();
            });

            // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
            $(".increment").click(function() {
                var n = $(this).siblings(".itxt").val();
                // console.log(n);
                n++;
                $(this).siblings(".itxt").val(n);
                // 4. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
                // 当前商品的价格:s
                // var p = $(this).parent().parent().siblings(".p-price").text();
                var p = $(this).parents(".p-num").siblings(".p-price").text();
                p = p.substr(1);
                $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2));
                // 6. 计算总计和总额模块
                getSum();
            });
             $(".decrement").click(function() {
                var n = $(this).siblings(".itxt").val();
                // console.log(n);
                n--;
                n < 1 ? n = 1 : n;
                $(this).siblings(".itxt").val(n);
                 // 4. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
                // 当前商品的价格
                var p = $(this).parents(".p-num").siblings(".p-price").text();
                p = p.substr(1);
                $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2));
                // 6. 计算总计和总额模块
                getSum();
            });

            //  5. 用户修改文本框的值 计算 小计模块  
            $(".itxt").change(function() {
                var n = $(this).val();
                var p = $(this).parents(".p-num").siblings(".p-price").text();
                p = p.substr(1);
                $(this).parents(".p-num").siblings(".p-sum").text("￥" + (p * n).toFixed(2));
                // 6. 计算总计和总额模块
                getSum();
            })



            getSum();
            // 6. 计算总计和总额模块 (核心操作, 事实上, 每一个操作之后, 都要调用一次.)
            // 核心思路: 封装成一个函数 + $(ele).each();
            function getSum() {
                var num = 0; // 总件数
                var mony = 0; // 总额数
                    // 总件数
                    $(".itxt").each(function(i, ele) {
                        // 如果该单选框 .j-checkbox 是被选中, 才执行计算, 否则不执行
                        var flag = $(ele).parents(".cart-item").find(".j-checkbox").prop("checked");
                        // console.log(flag);
                        if (flag) {
                            num += parseInt($(ele).val());
                        } else {
                            return true;
                        }
                    });
                    $(".amount-sum em").text(num);

                    // 总额数
                    $(".p-sum").each(function(i, ele) {
                        // 如果该单选框 .j-checkbox 是被选中, 才执行计算, 否则不执行
                        var flag = $(ele).parents(".cart-item").find(".j-checkbox").prop("checked");
                        if (flag) {
                            mony += parseFloat($(ele).text().substr(1));
                        } else {
                            return true;
                        }
                        
                    })
                    $(".price-sum em").text("￥" + mony.toFixed(2));
            };


            
            // 7. 删除商品模块
            // (1) 商品后面的删除按钮
            $(".p-action a").click(function() {
                // 隐式迭代
                $(this).parents(".cart-item").remove();
                // 6. 计算总计和总额模块
                getSum();
            })
            // (2) 删除选中的商品
            $(".remove-batch").click(function() {
                // 隐式迭代
                $(".j-checkbox:checked").parents(".cart-item").remove();
                // 6. 计算总计和总额模块
                getSum();
            })
            // (3) 清空购物车 删除全部商品
            $(".clear-all").click(function() {
                // 隐式迭代
                $(".cart-item").remove();
                // 6. 计算总计和总额模块
                getSum();
            })
            
        })
$(function() {
    // 去注册
    $(".login .myForm a").on("click", function() {
        // console.log("huah");
        $(".login").hide().next().show()
    });

    // 去登入
    $(".register .myForm a").on("click", function() {
        // console.log("huah");
        $(".login").show().next().hide()
    });

    // 表单校验
    var form = layui.form;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },

        repass: function(value, item) {
                var passVal = $(".register .myForm input[name=password]").val();

                if (passVal !== value) {
                    return "两次输入不一致"
                    $(".register .myForm .pass,.register .myForm .repass").val("")
                }
            }
            //我们既支持上述函数式的方式，也支持下述数组的形式
            //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
            ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });


    // 实现注册功能 给form submit
    // console.log($(".register .myForm"));
    $(".register .myForm").on("submit", function(e) {
        e.preventDefault()
            // console.log("hua");
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function(info) {
                if (info.status === 0) {
                    layer.open({
                            title: "温馨提示",
                            content: info.message,
                            // 自动消失
                            time: 1000
                        })
                        // 登录框出现，自己隐藏
                    $(".register").hide().prev().show()

                } else {
                    layer.open({
                        title: "温馨提示",
                        content: info.message,
                        time: 2000
                    })
                }
            }
        })
    })


    // 登录功能实现
    // console.log($(".login .myForm "));
    $(".login .myForm ").on("submit", function(e) {
        e.preventDefault()
            // console.log("花");
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(info) {
                if (info.status === 0) {
                    // 提示
                    layer.msg(info.message);
                    // 存token到localstorage
                    window.localStorage.setItem("token", info.token);
                    // 跳转到主页面
                    location.href = "../../index.html"
                }
            }
        })



    })









})
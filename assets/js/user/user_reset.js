$(function() {
    var form = layui.form;
    form.verify({
        // username: function(value, item) { //value：表单的值、item：表单的DOM对象
        //     if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        //         return '用户名不能有特殊字符';
        //     }
        //     if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        //         return '用户名首尾不能出现下划线\'_\'';
        //     }
        //     if (/^\d+\d+\d$/.test(value)) {
        //         return '用户名不能全为数字';
        //     }
        // },

        repass: function(value, item) {
                var passVal = $(".myForm input[name=newPwd]").val();

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

    // 修改密码功能：

    $(".myForm").on("submit", function(e) {
        e.preventDefault();
        // 请求
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function() {
                layer.open({
                    title: "温馨提示",
                    content: "修改成功!",
                    // 清空表单
                    yes: function(index, layero) {
                        $(".myForm")[0].reset(); //DOM对象方法reset()
                        layer.close(index) ///如果设定了yes回调，需进行手工关闭
                    }
                })
            }
        })

    })


})
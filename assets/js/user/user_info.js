$(function() {
    // 已进入这个页面就把用户原有信息默认显示
    var dataForm;
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function(info) {
            dataForm = info.data;
            if (info.status === 0) {
                layui.form.val("Form", info.data) // Form 是layui 中form 加上layui-filter属性
            }
        }
    })

    // 表单校验只校验email所以用其预设的email方式做
    // 修改信息进行提交表单信息
    $(".myForm").on("submit", function(e) {
        // 阻止默认行为
        e.preventDefault();
        // console.log("花"); //成功
        // 请求
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: layui.form.val("myForm"), //获取面单那有name 的值 也可用$(this).serialize()
            success: function(info) {
                // console.log(info);
                // 提示一下
                layer.msg(info.message)
            }
        })

    })
    $(".myForm .reset").on("click", function(e) {
        console.log("ja");
        e.preventDefault();

        // 重新将用户原始的信息自动存在
        layui.form.val('Form', dataForm)
    })

})
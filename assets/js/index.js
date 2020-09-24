$(function() {
    //   获取头像和用户名
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function(info) {
            console.log(info);
            if (info.status === 0) {
                $(".userInfo .welcome").html(`欢迎&nbsp;&nbsp;${info.data.username}`)
                    // 换图但是要判断图片是否存在
                if (info.data.user_pic) {
                    // 如果用户有头像
                    $("userInfo .layui-nav-img").show().attr("src", info.user_pic)
                    $(".layui-header .layui-nav-img").show().attr("src", info.user_pic)
                        // 默认设置的图片隐藏
                    $(".userInfo .text-avatar,.layui-header .text-avatar").hide()
                } else {
                    $(".userInfo .text-avatar,.layui-header .text-avatar").text(info.data.username.slice(0, 1)).show()
                }

            }

        }

    })

    // 退出功能
    // 点击退出， 跳到登入页面， 同时删除存储的token，
    $(".layui-header .logout").on("click", function() {
        // console.log("hua");
        //弹出提示  layui的弹出层-- 右侧的目录中下滑 --内置方法有confirm方法
        layer.confirm('真的确定退出吗？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 删除本地存储
            window.localStorage.removeItem("token")
                // 关闭该弹出层
            layer.close(index)
                // 跳转页面
            window.location.href = "../../login.html"

        });


    })












})
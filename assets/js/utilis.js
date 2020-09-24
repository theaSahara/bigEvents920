$(function() {
    $.ajaxPrefilter(function(options) {
        console.log(options);
        // 统一设置URL，具体的ajaxURL中就不用带上根路径
        options.url = "http://ajax.frontend.itheima.net" + options.url;

        // 在这里进行token的统一设置 后面所有的请示都不再需要在ajax()写headers
        // 我们在这里统一设置的token,是在请示头中设置的，但是登陆和注册是不需要带token
        // 因此在这里统一进行设置的时候，要将登陆和注册时的请示给排除掉

        // 判断一下，只要不是登陆和注册的请示，才会需要添加请示头携带token
        // 统一设置token
        // 1. 由于$.ajaxPrefilter只要发送请求 就会被执行
        // 2. 但是登陆和注册的请求是不需要携带token的
        // 3. 因此需要将登陆和注册的请求排除掉
        if (options.url.includes("/my")) {
            options.headers = {
                Authorization: window.localStorage.getItem("token")
            }
        }

        // 防翻墙
        options.complete = function(info) {
            console.log(info); // 打印发现有responseJSON 供判断
            // 根据响应回来的状态码和状态描述进行判断 如果status==1 且message=身份认证失败
            // 说明没有登陆或是token已经失效 请重新登陆 
            // 跳转到登陆页面

            if (info.responseJSON.status === 1 && info.responseJSON.message == "身份认证失败！") {

                window.location.href = "../../login.html"

            }
        }





    })
})
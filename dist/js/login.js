define(['jquery', "jquery-cookie"], function($){
    // alert(1);
        function loginSend(){
        $("#login-button").click(function(){
            // alert(1);
            $.ajax({
                type: "post",
                url: "./php/login.php",
                data: {
                    username: $(".item_account").eq(0).val(),
                    password: $(".item_account").eq(1).val()
                },
                success: function(result){
                    // alert("1");
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").find("em").attr("class", "icon_error")
                    }else{
                        setTimeout(function(){
                            location.assign("index.html");
                        }, 1000);
                        $(".err_tip").find("em").attr("class", "icon_select icon_true");
                        //将已经登录的用户名存储在cookie中
                        $.cookie("username", obj.username, {
                            expires: 7
                        })
                    }
                    $(".err_tip").show().find("span").html(obj.message);
                },
                error: function(msg){
                    console.log(msg);
                }
    
            })
            return false;
        })
        
    }
    return {
        loginSend: loginSend
    }
})
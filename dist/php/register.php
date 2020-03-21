<?php
    header('content-type:text/html;charset="utf-8"');
    //统一的返回格式  code => 码  message => 报错的信息
    $responseData = array("code" => 0, "message" => "");
    // var_dump($_POST);
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createtime = $_POST['createtime'];

    //做一个简单的验证
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        echo json_encode($responseData);
        exit; //退出php程序
    }

    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit; //退出php程序
    }

    if($password != $repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "两次密码输入不一致";
        echo json_encode($responseData);
        exit; //退出php程序
    }


    //高级验证，验证数据库中有没有重名的用户名
     //1、链接数据库  PHP7  PHP5.6（PHPnow）
     $link = mysqli_connect("127.0.0.1", "root", "123456abc");

     //2、判断数据库是否链接成功
     if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
         exit;
     }
 
     //3、设置访问字符集
     mysqli_set_charset($link, "utf8");
 
     //4、选择访问数据库
     mysqli_select_db($link, "yyy");

    //验证数据库中有没有重名的用户名
    $sql1 = "SELECT * FROM users WHERE username='{$username}'";

    $res1 = mysqli_query($link, $sql1);
    //mysql result  取出一行数据
    $row1 = mysqli_fetch_assoc($res1);
    if($row1){
        $responseData["code"] = 5;
        $responseData["message"] = "用户名重名";
        echo json_encode($responseData);
         exit;
    }

    //密码md5编码加密存储
    $str = md5(md5(md5($password)."qianfeng")."nizhan");

    //插入操作
    $sql2 = "INSERT INTO users(username,password,createtime) VALUES('{$username}','{$str}',{$createtime})";

    //返回true 插入成功  false 插入失败
    $res2 = mysqli_query($link, $sql2);
    if(!$res2){
        $responseData["code"] = 6;
        $responseData["message"] = "注册失败";
        echo json_encode($responseData);
         exit;
    }

    $responseData["message"] = "注册成功";
    echo json_encode($responseData);

    //8、关闭数据库
    mysqli_close($link);



?>
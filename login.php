<?php
    header('content-type:text/html;charset="utf-8"');
    //统一的返回格式  code => 码  message => 报错的信息
    $responseData = array("code" => 0, "message" => "");

    $username = $_POST['username'];
    $password = $_POST['password'];

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

    //高级验证，验证数据库中有没有重名的用户名
     //1、链接数据库  PHP7  PHP5.6（PHPnow）
     $link = mysql_connect("127.0.0.1", "root", "123456");

     //2、判断数据库是否链接成功
     if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器忙";
        echo json_encode($responseData);
         exit;
     }
 
     //3、设置访问字符集
     mysql_set_charset("utf8");
 
     //4、选择访问数据库
     mysql_select_db("yyy");

     //5、查询数据库，通过用户名和密码查询数据
    //密码md5编码加密存储
    $str = md5(md5(md5($password)."qianfeng")."nizhan");

    //6、准备sql语句进行查询
    $sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";

    $res = mysql_query($sql);
    //取出一行数据
    $row = mysql_fetch_assoc($res);
    
    if(!$row){
        //没有这个数据在数据库中
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码错误";
        echo json_encode($responseData);
         exit;
    }

    $responseData["message"] = "登陆成功";
    echo json_encode($responseData);


    //8、关闭数据库
    mysql_close($link);


?>
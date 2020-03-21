<?php
    header('content-type:text/html;charset="utf-8"');
    // var_dump($_GET);
    $id = $_GET['id'];

    //链接数据库删除
     //1、链接数据库  PHP7  PHP5.6（PHPnow）
     $link = mysqli_connect("127.0.0.1", "root", "123456abc");

     //2、判断数据库是否链接成功
     if(!$link){
         echo "服务器忙";
         exit;
     }
 
     //3、设置访问字符集
     mysqli_set_charset($link, "utf8");
 
     //4、选择访问数据库
     mysqli_select_db($link, "yyy");

     //5、准备sql  看一下sql对不对
    $sql = "DELETE FROM users WHERE id={$id}";
    
    //6、发送sql语句  删除成功返回true，否则返回false
    $res = mysqli_query($link, $sql);
    
    //7、处理结果
    if($res){
        echo "删除成功";
    }else{
        echo "删除失败";
    }

    //8、关闭数据库
    mysqli_close($link);
?>
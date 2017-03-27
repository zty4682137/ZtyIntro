<?php
    header('Content-Type: application/json;charset=UTF-8');
    @$kw=$_REQUEST['kw'] or die('{"code":"2","msg","kw required"}');
    @$kw=$_REQUEST['type'] or die('{"code":"2","msg","type required"}');

    require("init.php");


//    数据库操作变为 php测试用代码
//    $sql="SELECT * FROM kf_dish WHERE name or material LIKE '%$kw%'";
//    $result=mysqli_query($conn,$sql);
//    $result=mysqli_fetch_all($result,1);
//    echo json_encode($result);


    $arrStr='{{"id":"0","img_sm":"1.jpg","type":"classic","name":"Martin 90c","material":"做工优良的复合板吉他，塑料旋钮，象牙琴枕，护板","price":"$940"},{"id":"1","img_sm":"1.jpg","type":"classic","name":"Martin 90c","material":"做工优良的复合板吉他，塑料旋钮，象牙琴枕，护板","price":"$940"}}';
    $arr={{"id":"0","img_sm":"1.jpg","type":"classic","name":"Martin 90c","material":"做工优良的复合板吉他，塑料旋钮，象牙琴枕，护板","price":"$940"},{"id":"1","img_sm":"1.jpg","type":"classic","name":"Martin 90c","material":"做工优良的复合板吉他，塑料旋钮，象牙琴枕，护板","price":"$940"}};

//    $arr2=''{
//    {id:"0",img_sm:"1.jpg",type:"classic",name:"Martin 90c",material:"做工优良的复合板吉他，塑料旋钮，象牙琴枕，护板",price:"$940"},
//    {id:"0",img_sm:"1.jpg",type:"classic",name:"Martin 90c",material:"做工优良的复合板吉他，塑料旋钮，象牙琴枕，护板",price:"$940"}
//    }'';

    echo json_encode($arr);

?>
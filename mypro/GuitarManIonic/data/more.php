<?php
    header('Content-Type: application/json;charset=UTF-8');
    @$pagenum=$_REQUEST['pagenum'];

    if(!$pagenum)
    {
        $pagenum =1;
    }
    else
    {
        $pagenum=intval($pagenum);
    }
    $pagesize=3;
    $start=($pagenum-1)*$pagesize;
    require("init.php");
    $sql="select * from kf_dish limit $start,$pagesize";
//    $sql="select * from kf_dish ";
    $result=mysqli_query($conn,$sql);
    $result=mysqli_fetch_all($result,1);
    echo json_encode($result);
?>
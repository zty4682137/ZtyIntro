<?php
    header('Content-Type: application/json;charset=UTF-8');
    @$kw=$_REQUEST['kw'];

    require("init.php");
    $sql="SELECT * FROM kf_dish WHERE name or material LIKE '%$kw%'";
    $result=mysqli_query($conn,$sql);
    $result=mysqli_fetch_all($result,1);
    echo json_encode($result);
?>
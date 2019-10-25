<?php

//连接数据库
$link = mysql_connect("localhost","root","root"); //连接数据库
$sql = "use areas";
mysql_query($sql,$link);

$type = isset($_GET['type'])?$_GET['type']:0;//获取请求信息类型 1省 2市 3区
$province_num = isset($_GET['pnum'])?$_GET['pnum']:'110000';//根据省编号查市信息
$city_num = isset($_GET['cnum'])?$_GET['cnum']:'440100';//根据市编号查区信息

switch ($type) {//根据请求信息类型，组装对应的sql
    case 1://省
        $sql = "SELECT * FROM areas where pid is null";
        break;
    case 2://市
        $sql = "SELECT city.* FROM areas as city INNER JOIN areas as province on city.pid=province.aid WHERE province.aid='{$province_num}'";
        break;
    case 3://区
        $sql = "SELECT dis.* FROM areas as dis INNER JOIN areas as city on city.aid=dis.pid where city.aid='{$city_num}'";
        break;
    default:
        die('no data');
        break;
}
$result = mysql_query($sql,$link);//执行查询sql
if (mysql_num_rows($result) <= 0){
    die("no data");
}
// 组装数据输出
$rows = array();
while($row = mysql_fetch_assoc($result)) {
    $rows[] = $row;
}
echo json_encode($rows);//返回json数据



?>
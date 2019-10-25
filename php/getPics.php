<?php
 $link = mysql_connect("localhost","root","root"); //连接数据库
 $sql = "use content";   
 mysql_query($sql,$link);
 $sql = "set names utf8";
 mysql_query($sql,$link);





 $num = $_REQUEST['num'] *10;
 if($_REQUEST['num'] != 0) $num +1;
 $sql = "select img,height,title from content limit ".$num.",10";
 $result = mysql_query($sql,$link);
 
 $temp_arr = array();
 while($row = mysql_fetch_assoc($result)){
     $temp_arr[] = $row;
 }
 $json_arr = array();
 foreach($temp_arr as $k=>$v){
     $json_arr[]  = (object)$v;
 }
 echo json_encode( $json_arr );
 
 ?>
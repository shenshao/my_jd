<?php

header('Content-Type: text/html;charset=utf-8');


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段

if(isset($_SERVER["HTTP_ORIGIN"])) {
    header('Access-Control-Allow-Origin:'.$_SERVER["HTTP_ORIGIN"]);
}

header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies


define('IN_APP', TRUE);
//定义APP路径
define('APP_NAME', 'userSystem');
define('APP_PATH', dirname(__FILE__) . '/');

require(APP_PATH . 'libs/common.php');


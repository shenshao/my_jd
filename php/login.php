<?php
header('content-type:text/html;charset=utf-8');
    error_reporting(0);

    $user = $_GET['user'];
    $password = $_GET['pwd'];
    echo "用户名是{$user},密码是{$password}";

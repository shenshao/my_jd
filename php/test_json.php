<?php

$array = array();

$array[0] = array( "title" => "new111" );
$array[1] = array( "title" => "new222" );
$array[2] = array( "title" => "new333" );

$json_str = json_encode($array);

echo $_GET['callback']."(".$json_str.")";
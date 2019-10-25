<?php

header("content-type:text/html;charset=utf-8");

error_reporting(0);

$array = array(
	 array('con' => '李克强总理选举结果出炉 巴育当选新一届政府总理', 'date' => '2019-6-5'),

	 array('con' => '印度拟从美国购买24架MH-60R直升机 可在航母使用', 'date' => '2019-6-3'),
	 array('con' => '华为被美列入"实体清单"后 多家美企下调营收预期', 'date' => '2019-6-7'),
);

echo json_encode($array);



 











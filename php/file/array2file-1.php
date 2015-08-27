<?php
$file='./cache/phone.php';
$array=array('color'=> array('blue','red','green'),'size'=> array('small','medium','large'));
//缓存
if(false!==fopen($file,'w+')){
	file_put_contents($file,serialize($array));//写入缓存
}
//读出缓存
$handle=fopen($file,'r');
$cacheArray=unserialize(fread($handle,filesize($file)));

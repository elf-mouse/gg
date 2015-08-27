<?php
$file='./cache/phone.php';
$array=array('color'=> array('blue','red','green'),'size'=> array('small','medium','large'));
//缓存
$text='<?php $rows='.var_export($array,true).';';
if(false!==fopen($file,'w+')){
	file_put_contents($file,$text);
}else{
	echo '创建失败';
}
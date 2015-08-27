<?php
$file='./cache/phone.php';
$array=array('color'=> array('blue','red','green'),'size'=> array('small','medium','large'));
cache_write($file,$array,'rows',false);

//写入
function cache_write($filename,$values,$var='rows',$format=false){ 
	$cachefile=$filename;
	$cachetext="<?php\r\n".'$'.$var.'='.arrayeval($values,$format).";";
	return writefile($cachefile,$cachetext);
}

//数组转换成字串 
function arrayeval($array,$format=false,$level=0){ 
	$space=$line='';
	if(!$format){
		for($i=0;$i<=$level;$i++){ 
			$space.="\t";
		}
		$line="\n";
	}
	$evaluate='Array'.$line.$space.'('.$line;
	$comma=$space;
	foreach($array as $key=> $val){ 
		$key=is_string($key)?'\''.addcslashes($key,'\'\\').'\'':$key;
		$val=!is_array($val)&&(!preg_match('/^\-?\d+$/',$val)||strlen($val) > 12)?'\''.addcslashes($val,'\'\\').'\'':$val;
		if(is_array($val)){ 
			$evaluate.=$comma.$key.'=>'.arrayeval($val,$format,$level+1);
		}else{
			$evaluate.=$comma.$key.'=>'.$val;
		}
		$comma=','.$line.$space;
	}
	$evaluate.=$line.$space.')';
	return $evaluate;
}

//写入文件
function writefile($filename,$writetext,$openmod='w'){ 
	if(false!==$fp=fopen($filename,$openmod)){ 
		flock($fp,2);
		fwrite($fp,$writetext);
		fclose($fp);
		return true;
	}else{
		return false;
	}
}
<?php
$arr_names = array('""','null',null,'array()','false','15','1','0','-1','"15"','"1"','"0"','"-1"','"foo"','"true"','"false"');
$arr_vars = array("",null,@$x,array(),false,15,1,0,-1,"15","1","0","-1","foo","true","false");
$arr_func = array('&nbsp;','gettype()','empty()','is_null()','isset()','(bool)');
function getTrueOrFalse($var) {
    return $var?'<span class="green">true</span>':'<span class="red">false</span>';
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>True or False (for PHP)</title>
<style>.green{color:green}.red{color:red}</style>
</head>
<body>
	<table border="1">
		<thead>
			<tr>
			    <?php foreach ($arr_func as $func): ?>
			    <th><?php echo $func; ?></th>
			    <?php endforeach; ?>
			</tr>
		</thead>
		<tbody>
			<?php foreach ($arr_vars as $key => $var): ?>
			<tr>
				<td><?php echo '$x'.(!is_null($arr_names[$key])?'='.$arr_names[$key]:'').';'; ?></td>
				<td><?php echo gettype($var); ?></td>
				<td><?php echo getTrueOrFalse(empty($var)); ?></td>
				<td><?php echo getTrueOrFalse(is_null($var)); ?></td>
				<td><?php echo getTrueOrFalse(isset($var)); ?></td>
				<td><?php echo getTrueOrFalse((bool)$var); ?></td>
			</tr>
			<?php endforeach; ?>
		</tbody>
	</table>
</body>
</html>
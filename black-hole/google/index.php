<?php
$basePath = dirname(__FILE__) . DIRECTORY_SEPARATOR;
$q = isset($_GET['q']) ? $_GET['q'] : false;
if ($q) {
    $filename = $q . '.html';
    if (!is_file($basePath . $filename)) {
        echo 'not exist';
        exit;
    }
}
else {
    echo 'please input ?q=YYYY/mm/dd';
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hello Google</title>
</head>
<body>
	<?php if ($q) include $filename; ?>
</body>
</html>
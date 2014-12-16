<?php
header('Cache-Control: no-cache, must-revalidate'); // HTTP/1.1

if ($_POST['isAjax']) {
	header('Content-Type: application/json; charset=UTF-8'); // JSON Object
}
else {
	header('Content-Type: text/html; charset=UTF-8'); // HTML String
}

header('access-control-allow-origin: *'); // Cross-Origin Resource Sharing (CORS)

function is_valid_callback($subject) {
	$identifier_syntax = '/^[$_\p{L}][$_\p{L}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\x{200C}\x{200D}]*+$/u';

	$reserved_words = array('break', 'do', 'instanceof', 'typeof', 'case',
		'else', 'new', 'var', 'catch', 'finally', 'return', 'void', 'continue',
		'for', 'switch', 'while', 'debugger', 'function', 'this', 'with',
		'default', 'if', 'throw', 'delete', 'in', 'try', 'class', 'enum',
		'extends', 'super', 'const', 'export', 'import', 'implements', 'let',
		'private', 'public', 'yield', 'interface', 'package', 'protected',
		'static', 'null', 'true', 'false');

	return preg_match($identifier_syntax, $subject) && !in_array(mb_strtolower($subject, 'UTF-8'), $reserved_words);
}

$data = array(
	'code' => 200,
	'message' => 'ok'
);
$json = json_encode($data);

# JSON if no callback
if (!isset($_GET['callback'])) {
	exit($json);
}

# JSONP if valid callback
if (is_valid_callback($_GET['callback'])) {
	exit($_GET['callback'] . '(' . $json . ')');
}

# Otherwise, bad request
header('status: 400 Bad Request', true, 400);

<?php
// 1、通过把Content-Type设置为application/octet-stream，可以把动态生成的内容当作文件来下载；content-type内容设置可以参看：http://www.ostools.net/commons
// 2、用Content-Disposition设置下载的文件名；
// 3、 基本上，下载程序都是这么写的：
$filename = 'document.txt';
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=' . $filename);
print 'Hello';
// 4、当然要考虑到浏览器兼容性和对如果文件名是中文的话出现异常bug，我们这么写：
$ua = $_SERVER['HTTP_USER_AGENT'];
$filename = '文件名.txt';
$encoded_filename = urlencode($filename);
$encoded_filename = str_replace('+', '%20', $encoded_filename);
header('Content-Type: application/octet-stream');
if (preg_match('/MSIE/', $ua)) {
    header('Content-Disposition: attachment; filename="' . $encoded_filename . '"');
} else if (preg_match("/Firefox/", $ua)) {
    header('Content-Disposition: attachment; filename*="utf8\'\'' . $filename . '"');
} else {
    header('Content-Disposition: attachment; filename="' . $filename . '"');
}
print 'World';
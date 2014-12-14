<?php
$charset = 'UTF-8';
function outputHTML($string) {
    echo htmlspecialchars($string);
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>charset</title>
</head>
<body>
<ol>
    <li>
        <h4>页面编码</h4>
        <dl>
            <dt>HTML: meta</dt>
            <dd>HTML4: <?php outputHTML('<meta http-equiv="Content-Type" content="text/html; charset='.$charset.'" />'); ?><br>HTML5: <?php outputHTML('<meta charset="xxx">'); ?></dd>
            <dt>PHP: header</dt>
            <dd>header("content-type:text/html; charset=<?php echo $charset; ?>");</dd>
            <dt>Apache: AddDefaultCharset(Apache/conf/httpd.conf)</dt>
            <dd>#AddDefaultCharset <?php echo $charset; ?></dd>
        </dl>
    </li>
    <li>
        <h4>数据库编码</h4>
        <dl>
            <dt>MySQL</dt>
            <dd>mysql_query("SET NAMES <?php echo $charset; ?>");</dd>
        </dl>
    </li>
    <li>
        <h4>PHP页面编码统一</h4>
        <p>MySQL数据库编码、html页面编码、PHP或html文件本身编码要全部一致。</p>
        <dl>
            <dt>1) MySQL数据库编码</dt>
            <dd>mysql_query('SET NAMES utf8');</dd>
            <dt>2) HTML页面的编码</dt>
            <dd><?php outputHTML('<meta charset="utf-8">'); ?></dd>
            <dt>3) PHP或html文件本身的编码</dt>
            <dd>用文本编辑器打开php文件或html文件，另存时，选择的编码，如果数据库和页面编码是gbk,则这儿的编码选择ansi；如果数据库和页面编码是utf-8，则这儿也选择utf-8。</dd>
            <dt>4) 另外要注意的是，Javascript或Flash中传递的数据是utf-8编码，如果数据库和页面编码是gbk，要进行转码，然后写入数据库。</dt>
            <dd>$content = iconv("gb2312", "utf-8//IGNORE", $content);</dd>
            <dt>5) 在PHP程序中，可以加上一行，来指定PHP源程序的编码</dt>
            <dd>header('Content-type: text/html; charset=utf-8');</dd>
        </dl>
    </li>
</ol>
</body>
</html>
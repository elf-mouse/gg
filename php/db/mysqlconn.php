<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$conn = @mysql_connect($host, $user, $pass) or die('Failed:(');
if ($conn) echo 'Successful:)';
mysql_close();
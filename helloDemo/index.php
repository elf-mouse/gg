<?php
/**
 * 自动新建前端Demo骨架
 * @author Elf-mousE
 * @website http://elf-mouse.me/
 * @since 2013.12.09
 */
date_default_timezone_set('Asia/Shanghai');
class HelloDemo
{
    public $today = '';
    public $html = '';
    public $css = '';
    public $js = '';

    function __construct() {
        $year  = date('Y');
        $month = date('m');
        $day   = date('d');
        $hour  = date('H');

        $today = $year . $month . $day . '_' . $hour;
        $htmlTpl = $today . '/index.html';
        $cssTpl  = $today . '/css/main.css';
        $jsTpl   = $today . '/js/main.js';

        if (!is_dir($today)) {
            mkdir($today);
            mkdir($today . '/css');
            mkdir($today . '/img');
            mkdir($today . '/js');

            file_put_contents($htmlTpl, 'Hello Demo');
            file_put_contents($cssTpl, '');
            file_put_contents($jsTpl, '');
        }

        $this->today = $today;
        $this->html = $htmlTpl;
        $this->css = $cssTpl;
        $this->js = $jsTpl;
    }
}
$demo = new HelloDemo();
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Demo <?php echo $demo->today; ?></title>
<link rel="stylesheet" href="<?php echo $demo->css; ?>">
</head>
<body>
	<?php if ($demo->html): ?>
	<?php include $demo->html; ?>
	<?php else: ?>
	<?php echo 'File does not exist :('; ?>
	<?php endif; ?>
	<script src="<?php echo $demo->js; ?>"></script>
</body>
</html>

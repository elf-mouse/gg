<?php
// 1 利用pathinfo函数
function fileExt($filename) {
    $path_info = pathinfo($filename);
    return $path_info['extension'];
}
// 2 利用strrchr取得后缀名
function fileExt2($filename) { // 个人建议在$filename上加上basename()，这样可以对路径也处理一下
    return trim(substr(strrchr($filename, '.'), 1, 10));
}
// 3 利用end函数
function fileExt3($filename) {
    $arr = explode('.', $filename); // split之类的都可以
    return end($arr);
}
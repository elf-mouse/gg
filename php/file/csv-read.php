<?php
// 方法1
function readCSV_1($filename) {
    $handle = fopen($filename, 'r');
    $row = 0;
    while (!feof($handle)) {
        $buffer = fgetss($handle, 2048);
        if ($buffer) {
            $data = explode(',', $buffer);
            $num = count($data);
            ++$row;
            echo $row . ' ';
            for ($i = 0; $i < $num; $i++) {
                echo $data[$i] . '<br>';
            }
        }
    }
    echo '共' . $row . '条数据';
}

// 方法2
function readCSV_2($filename) {
    $handle = fopen($filename, 'r');
    $row = 0;
    while ($data = fgetcsv($handle, 1000, ',')) {
        $num = count($data);
        ++$row;
        echo $row . ' ';
        for ($i = 0; $i < $num; $i++) {
            echo $data[$i] . '<br>';
        }
    }
    echo '共' . $row . '条数据';
}

// demo
$filename = '../files/data.csv';
//readCSV_1($filename);
//readCSV_2($filename);

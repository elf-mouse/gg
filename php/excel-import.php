<?php
// 1 PHPExcelReader方式：http://sourceforge.net/projects/phpexcelreader/
require_once 'Excel/reader.php';
function readExcel($file) {
    $data = new Spreadsheet_Excel_Reader(); // 创建Spreadsheet_Excel_Reader类的对象，用于读取excel
    $data->setOutputEncoding('UTF-8'); // 设置解析后的数据的字符编码
    $data->read($file); // $file为excel文件名
    error_reporting(E_ALL ^ E_NOTICE); // 输出E_ALL ^ E_NOTICE级别的信息（报错）
    // 使用$data->sheets读取excel的数据
    $excelArr = array();
    for ($j = 1; $j <= $data->sheets[0]['numCols']; $j++) {
        $index = $data->sheets[0]['cells'][1][$j];
        $excelArr[$index] = array();
        for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
            $excelArr[$index][] = $data->sheets[0]['cells'][$i][$j];
        }
    }
    return $excelArr;
}
$share = readExcel("test.xls");
print_r($share);
// 2 PHPExcel方式：http://phpexcel.codeplex.com/
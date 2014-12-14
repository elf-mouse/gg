<?php
/**
 * @param $content string 要输出的csv格式的数据，用逗号分隔各字段
 * @param $filename string 要导出的文件名，比如：mail-list.csv
 * @return null
 */
function outputCSV($content, $filename = NULL) {
    if (empty($filename)) {
        $filename = date('Ymd') . '.csv';
    }
    $BOM = chr(0xEF).chr(0xBB).chr(0xBF);
    $content = $BOM . $content;
    header('Cache-Control: public');
    header('Pragma: public');
    header('Content-type: text/csv; charset=utf-8') ;
    header('Content-Disposition: attachment; filename=' . $filename);
    header('Content-Length: ' . strlen($content));
    echo $content;
    exit;
}

function csv($head, $data, $charset = 'utf-8') {
    $filename = date('YmdHis') . '.csv';
    header('Content-Type: text/comma-separated-values');
    header('Content-Disposition: attachment; filename=' . $filename);
    iconv_set_encoding('internal_encoding', $charset);
    iconv_set_encoding('output_encoding', 'gbk');
    ob_start('ob_iconv_handler');
    $fp = fopen('php://output', 'w');
    fputcsv($fp, $head);
    foreach ($data as $row) {
        fputcsv($fp, array_merge($head, $row));
    }
    fclose($fp);
    ob_end_flush();
}

// demo1
$content = 'abc,123,阿斯顿';
//outputCSV($content);

// demo2
$head = array(
        'id' => '编号',
        'mail' => '邮件'
);
$data = array(
        array(
                'id' => 1,
                'mail' => 'mail1@123.com'
        ),
        array(
                'id' => 2,
                'mail' => 'mail2@123.com'
        )
);
//csv($head, $data);

<?php
function diverse_array($vector) {
    $result = array();
    foreach ($vector as $key1 => $value1) {
        if (is_array($value1)) { // for multiple
            foreach ($value1 as $key2 => $value2) {
                $result[$key2][$key1] = $value2;
            }
        }
        else { // for single
            $result[] = $vector;
            break;
        }
    }
    return $result;
}
function fileExt($filename) {
    $arr = explode('.', $filename);
    return end($arr);
}
function fileUpload($file, $filename) {
    $success = false;
    $error = $file['error'];
    if ($error == 0) {
        $name = $file['name'];
        $type = $file['type'];
        $tmp_name = $file['tmp_name'];
        $size = $file['size'];
        $upload_filename = $filename . '.' . fileExt($name);
        $destination = dirname(__FILE__) . '/uploads/' . $upload_filename;
        if (move_uploaded_file($tmp_name, $destination)) {
            $success = true;
        }
    }
    return $success;
}
if ($_POST) {
    $files = diverse_array($_FILES['file']);
    $files_count = count($files);
    $uploaded_count = 0;
    if ($files_count > 1) { // for multiple
        foreach ($files as $number => $file) {
            if (fileUpload($file, 'multiple-' . $number)) {
                $uploaded_count++;
            }
        }
    }
    else { // for single
        $file = $files[0];
        if (fileUpload($file, 'single')) {
            $uploaded_count++;
        }
    }
    if ($uploaded_count == $files_count) {
        // all uploaded
    }
}
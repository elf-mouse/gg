<?php
$demo = 1;

switch ($demo) {
	case 1:
		print_r($_REQUEST);
		break;
	case 5:
		$data = array(
			'computedString' => $_POST['userName']
		);
		echo json_encode($data);
		break;
	default:
		$data = array(
			'code' => -1,
			'message' => 'Unknown Error!',
			'data' => array(
				'name' => 'asd',
				'pass' => '123456'
			)
		);
		echo json_encode($data);
		break;
}

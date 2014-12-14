<?php
$now = date('Y-m-d H:i:s');
$sql = "INSERT INTO $table(username,password,created) VALUES(:username,:password,:created)";
// function 1
$db = Yii::app()->db;
$table = User::model()->tableName();
$cmd = $db->createCommand($sql);
$rs = $cmd->query(array(
        ':username' => $username,
        ':password' => $password,
        ':created'  => $now
));
// function 2
$cmd = User::model()->dbConnection->createCommand($sql);
$cmd->bindParam(':username', $username, PDO::PARAM_STR);
$cmd->bindParam(':password', $password, PDO::PARAM_STR);
$cmd->bindParam(':created', $now, PDO::PARAM_STR);
$rs = $cmd->execute();
// function 3
$user = new User();
$user->username = $username;
$user->password = $password;
$user->created = $now;
$rs = $user->save();
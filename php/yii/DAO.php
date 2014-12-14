<?php// DAO: Data Access Object
// 1. connection
$connection = new CDbConnection($dsn,$username,$password);
// establish connection. You may try...catch possible exceptions
$connection->active = true;
// ...
$connection->active = false; // close connection
// 2. Executing SQL Statements
$connection = Yii::app()->db; // assuming you have configured a "db" connection
// If not, you may explicitly create a connection:
// $connection = new CDbConnection($dsn,$username,$password);
$command = $connection->createCommand($sql);
// if needed, the SQL statement may be updated as follows:
// $command->text = $newSQL;
$rowCount = $command->execute(); // execute the non-query SQL
$dataReader = $command->query(); // execute a query SQL
$rows = $command->queryAll(); // query and return all rows of result
$row = $command->queryRow(); // query and return the first row of result
$column = $command->queryColumn(); // query and return the first column of result
$value = $command->queryScalar(); // query and return the first field in the first row
// 3. Fetching Query Results
$dataReader = $command->query();
// calling read() repeatedly until it returns false
while (($row = $dataReader->read()) !== false) {    }
// using foreach to traverse through every row of data
foreach ($dataReader as $row) {    }
// retrieving all rows at once in a single array
$rows=$dataReader->readAll();
// 4. Using Transactions
$transaction = $connection->beginTransaction();
try {
    $connection->createCommand($sql1)->execute();
    $connection->createCommand($sql2)->execute();
    //.... other SQL executions
    $transaction->commit();
}
catch (Exception $e) { // an exception is raised if a query fails
    $transaction->rollback();
}
// 5. Binding Parameters
// an SQL with two placeholders ":username" and ":email"
$sql = "INSERT INTO tbluser (username, email) VALUES(:username,:email)";
$command = $connection->createCommand($sql);
// replace the placeholder ":username" with the actual username value
$command->bindParam(":username",$username,PDO::PARAMSTR);
// replace the placeholder ":email" with the actual email value
$command->bindParam(":email",$email,PDO::PARAMSTR);
$command->execute();
// insert another row with a new set of parameters
$command->bindParam(":username",$username2,PDO::PARAMSTR);
$command->bindParam(":email",$email2,PDO::PARAMSTR);
$command->execute();
// 6. Binding Columns
$sql = "SELECT username, email FROM tbluser";
$dataReader = $connection->createCommand($sql)->query();
// bind the 1st column (username) with the $username variable
$dataReader->bindColumn(1,$username);
// bind the 2nd column (email) with the $email variable
$dataReader->bindColumn(2,$email);
while ($dataReader->read()!==false) {
    // $username and $email contain the username and email in the current row
}
// 7. Using Table Prex
$sql = 'SELECT * FROM {{user}}';
$users = $connection->createCommand($sql)->queryAll();
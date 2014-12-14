<?php// AR: Active Reocrd
// 1.create
$post = new Post();
$post->attributes = $_POST['Post'];
$post->created = time();
$post->save();
// 2.reading
$model = Post::model();
// find the first row satisfying the specified condition
$post = $model->find($condition,$params);
// find the row with the specified primary key
$post = $model->findByPk($postID,$condition,$params);
// find the row with the specified attribute values
$post = $model->findByAttributes($attributes,$condition,$params);
// find the first row using the specified SQL statement
$post = $model->findBySql($sql,$params);
// example
// find the row with postID=10
$post = $model->find('postID=:postID', array(':postID'=>10));
// Criteria
$criteria = new CDbCriteria;
$criteria->select = 'title'; // only select the 'title' column
$criteria->condition = 'postID=:postID';
$criteria->params = array(':postID'=>10);
$post = $model->find($criteria); // $params is not needed
// find all rows satisfying the specified condition
$posts = $model->findAll($condition,$params);
// find all rows with the specified primary keys
$posts = $model->findAllByPk($postIDs,$condition,$params);
// find all rows with the specified attribute values
$posts = $model->findAllByAttributes($attributes,$condition,$params);
// find all rows using the specified SQL statement
$posts = $model->findAllBySql($sql,$params);
// get the number of rows satisfying the specified condition
$n = $model->count($condition,$params);
// get the number of rows using the specified SQL statement
$n = $model->countBySql($sql,$params);
// check if there is at least a row satisfying the specified condition
$exists = $model->exists($condition,$params);
// 3.updating
$model = Post::model();
// update the rows matching the specified condition
$model->updateAll($attributes,$condition,$params);
// update the rows matching the specified condition and primary key(s)
$model->updateByPk($pk,$attributes,$condition,$params);
// update counter columns in the rows satisfying the specified conditions
$model->updateCounters($counters,$condition,$params);
// 4.deleting
$model = Post::model();
$post = $model->findByPk(10); // assuming there is a post whose ID is 10
$post->delete(); // delete the row from the database table
// delete the rows matching the specified condition
$model->deleteAll($condition,$params);
// delete the rows matching the specified condition and primary key(s)
$model->deleteByPk($pk,$condition,$params);
// 5.transaction
$model = Post::model();
$transaction = $model->dbConnection->beginTransaction();
try {
    // find and save are two steps which may be intervened by another request
    // we therefore use a transaction to ensure consistency and integrity
    $post = $model->findByPk(10);
    $post->title = 'new post title';
    $post->save();
    $transaction->commit();
} catch(Exception $e) {
    $transaction->rollback();
}
<ol>
<li>导出整个数据库: mysqldump -u 用户名 -p 数据库名 > 导出的文件名<br>
mysqldump -u root -p db_name > db_name.sql</li>
<li>导出一个表: mysqldump -u 用户名 -p 数据库名 表名 > 导出的文件名<br>
mysqldump -u root -p db_name table_name > table_name.sql</li>
<li>导出一个数据库结构:<br>
mysqldump -u root -p -d --add-drop-table db_name > db_name.sql<br>
-d 没有数据<br>
--add-drop-table 在每个create语句之前增加一个drop table</li>
<li>导入数据库:<br>
常用source命令<br>
进入mysql数据库控制台<br>
如mysql -u root -p<br>
mysql > use 数据库<br>
然后使用source命令，后面参数为脚本文件(如这里用到的.sql)<br>
SET NAMES 'utf8';<br>
mysql > source db_name.sql</li>
</ol>
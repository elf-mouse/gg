# 文件路径

* `module.filename`：开发期间，该行代码所在的文件。
* `__filename`：始终等于 `module.filename`。
* `__dirname`：开发期间，该行代码所在的目录。
* `process.cwd()`：运行node的工作目录，可以使用  cd /d 修改工作目录。
* `require.main.filename`：用node命令启动的module的filename, 如 node xxx，这里的filename就是这个xxx。

> `require()`方法的坐标路径是：`module.filename`；`fs.readFile()`的坐标路径是：`process.cwd()`。

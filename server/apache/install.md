## 安装Apache (CentOS)

> 检查是否安装 `rpm -qa | grep httpd`  
> 安装 `yum -y install httpd`  
> 备份配置文件 `cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.confbak`  
> 启动 `service httpd start`  
> 设为开机启动 `chkconfig httpd on`  
> 重启 `service httpd restart`  
> 查看运行状态 `service httpd status`

## 配置

    ServerTokens OS　 #在44行 修改为：ServerTokens Prod （在出现错误页的时候不显示服务器操作系统的名称）  

    ServerSignature On　 #在536行 修改为：ServerSignature Off （在错误页中不显示Apache的版本）  

    Options Indexes FollowSymLinks　 #在331行 修改为：Options Includes ExecCGI  FollowSymLinks（允许服务器执行CGI及SSI，禁止列出目录）  

    #AddHandler cgi-script .cgi　#在796行 取消“#” 修改为：AddHandler cgi-script .cgi .pl （允许扩展名为.pl的CGI脚本运行）  

    AllowOverride None　 #在338行 修改为：AllowOverride All （允许.htaccess）  

    AddDefaultCharset UTF-8　#在759行 修改为：AddDefaultCharset GB2312　（添加GB2312为默认编码）  

    Options Indexes MultiViews FollowSymLinks #在554行 修改为 Options MultiViews FollowSymLinks（不在浏览器上显示树状目录结构）  

    DirectoryIndex index.html index.html.var #在402行 修改为：DirectoryIndex index.html index.htm Default.html Default.htm index.php Default.php index.html.var （设置默认首页文件，增加index.php）  

    KeepAlive Off #在76行 修改为：KeepAlive On （允许程序性联机）  

    MaxKeepAliveRequests 100  #在83行 修改为：MaxKeepAliveRequests 1000 （增加同时连接数）

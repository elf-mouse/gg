<dl>
<dt>安装Apache</dt>
<dd>
<pre>
检查是否安装 <b>rpm -qa | grep httpd</b>
安装 <b>yum -y install httpd</b>
备份配置文件 cp /etc/httpd/conf/httpd.conf /etc/httpd/conf/httpd.confbak
启动 <b>service httpd start</b>
设为开机启动 <b>chkconfig httpd on</b>
重启 <b>service httpd restart</b>
查看运行状态 <b>service httpd status</b>
</pre>
</dd>
</dl>
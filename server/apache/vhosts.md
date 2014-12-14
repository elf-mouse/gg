<pre>
&lt;VirtualHost 127.0.0.1:80&gt;
    ##ServerAdmin webmaster@yourdomain.com
    DocumentRoot "/var/www"
    ServerName yourdomain.com
    ##ErrorLog "logs/yourdomain.com-error.log"
    ##CustomLog "logs/yourdomain.com-access.log" common
    &lt;Directory "/var/www"&gt;
        Options Indexes FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    &lt;/Directory&gt;
&lt;/VirtualHost&gt;
</pre>

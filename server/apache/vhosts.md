    <VirtualHost 127.0.0.1:80>  
        ##ServerAdmin webmaster@yourdomain.com  
        DocumentRoot "/var/www"  
        ServerName yourdomain.com  
        ##ErrorLog "logs/yourdomain.com-error.log"  
        ##CustomLog "logs/yourdomain.com-access.log" common  
        <Directory "/var/www">  
            Options Indexes FollowSymLinks  
            AllowOverride All  
            Order allow,deny  
            Allow from all  
        </Directory>  
    </VirtualHost>

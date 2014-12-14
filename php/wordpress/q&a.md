<dl>
    <dt>Briefly unavailable for scheduled maintenance. Check back in a minute.</dt>
    <dd>
        <ol>
            <li>新建.maintenance <pre>&lt;?php $upgrading = 600000000000; ?&gt;</pre></li>
            <li>修改wp-includes/load.php 找到function wp_maintenance <pre>&lt;?php echo /*WP_I18N_MAINTENANCE*/'维护'/*/WP_I18N_MAINTENANCE*/; ?&gt;
&lt;?php echo /*WP_I18N_MAINT_MSG*/'正在执行例行维护，请一分钟后回来。'/*/WP_I18N_MAINT_MSG*/; ?&gt;</pre></li>
        </ol>
        另外推荐一个WordPress插件：<a href="http://wordpress.org/plugins/maintenance-mode/" target="_blank">Maintenance Mode</a>，该插件同样可以简单的实现暂时关闭博客的功能。
    </dd>
</dl>
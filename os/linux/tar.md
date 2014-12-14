<dl>
<dt>压缩</dt>
<dd>
<ol>
<li>基本用法 <b>tar -cf all.tar *.jpg</b></li>
<li>tar调用gzip <b>tar -czf all.tar.gz *.jpg</b></li>
<li>tar调用bzip2 <b>tar -cjf all.tar.bz2 *.jpg</b></li>
<li>tar调用compress <b>tar -cZf all.tar.Z *.jpg</b></li>
<li>rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux</li>
<li>zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux</li>
</ol>
</dd>
</dl>
<hr>
<dl>
<dt>解压</dt>
<dd>
<ol>
<li>*.tar 用 <b>tar –xvf</b></li>
<li>*.gz 用 <b>gzip -d</b> 或 <b>gunzip</b></li>
<li>*.tar.gz和*.tgz 用 <b>tar –xzf</b></li>
<li>*.bz2 用 <b>bzip2 -d</b> 或 <b>bunzip2</b></li>
<li>*.tar.bz2 用 <b>tar –xjf</b></li>
<li>*.Z 用 <b>uncompress</b></li>
<li>*.tar.Z 用 <b>tar –xZf</b></li>
<li>*.rar 用 unrar e</li>
<li>*.zip 用 unzip</li>
</ol> 
</dd>
</dl>
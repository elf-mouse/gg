## JavaScript和Python的url编码解码函数

如果一个url带有动态参数，那么这个url就很难被当做其他url的参数进行传递了，因为浏览器无法正确识别，这个时候就需要对url进行编码，把不是字母数字的字符转换成%的形式  

JavaScript对url进行编码的函数有3个，`escape`，`encodeURI`，`encodeURIComponent`  
推荐使用最后一个，因为encodeURIComponent()不编码的字符最少，只有5个  

> ~!*()'

* `encodeURIComponent`和`decodeURIComponent`可以成对使用
* 对应Python的函数是`urllib.quote` 和 `urllib.unquote`，也可以成对使用
* 在client端用`encodeURIComponent`编码，在服务器端可以用`urllib.unquote`解码

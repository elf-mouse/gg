# CSS 风格指南


## 1. 编码规则

1.1 **CSS 代码有效性。**

**尽量标准定义的、有效的 CSS 代码**，最终的结果应该能通过 CSS 校验器校验（具体项目中视目标平台而定，不盲目追求通过代码校验）。

1.2 **不要使用 `@import`**

与 `<link>` 相比，`@import` 要慢很多，不光增加额外的请求数，还会导致不可预料的问题。

替代办法：

* 使用多个 `<link>` 元素；
* 通过 Sass 或 Less 类似的 CSS 预处理器将多个 CSS 文件编译为一个文件；
* 其他 CSS 文件合并工具。

1.3 **ID、Class 命名**

**ID、Class 使用语义化、通用的命名方式。**

* 只允许使用的小写字母、连字符、数字；
* 应该从 ID 和 Class 的名字上就能看出这元素是干嘛用的（角色、功能、状态），而不是表象（颜色、位置等）或模糊不清的命名；
* 表明、反映元素作用的名字易于理解，且后期修改的可能性小；
* 对与同级元素相比没有特殊的意义的元素使用通用的命名；
* 使用功能性或通用的名字可以减少不必要的文件修改。

demo

    /* Recommended: specific */
    #gallery {}
    #login {}
    .video {}

    /* Recommended: generic */
    .aux {}
    .alt {}


    /* Not recommended: meaningless */
    #yee-1901 {}

    /* Not recommended: presentational */
    .button-green {}
    .red {}
    .left {}

1.4 **ID、Class 命名风格**

**ID 和 Class 的名称应尽量简短**，但应注意保留可读、可辨识性。

    /* Recommended */
    #nav {} /* 简洁、可辨识的简写 */
    .author {} /* 本身比较短，可辨识 */

    /* Not recommended */
    #navigation {} /* 太长，可以精简 */
    .atr {} /* 不可读，无法辨识 */

1.5 **避免元素选择器和 ID、Class 叠加使用**

出于[性能考量](http://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/)，在没有必要的情况下避免元素选择器叠加 ID、Class 使用。

元素选择器和 ID、Class 混合使用也违反 **关注分离** 原则。如果HTML标签修改了，就要再去修改 CSS 代码，不利于后期维护。

    /* Recommended */
    #example {}
    .error {}

    /* Not recommended */
    ul#example {}
    div.error {}

1.6 **使用属性简写**

使用简写可以提高代码执行效率和易读性。

    /* Recommended */
    .el {
      border-top: 0;
      font: 100%/1.6 palatino, georgia, serif;
      padding: 0 1em 2em;
    }

    /* Not recommended */
    .el {
      border-top-style: none;
      font-family: palatino, georgia, serif;
      font-size: 100%;
      line-height: 1.6;
      padding-bottom: 2em;
      padding-left: 1em;
      padding-right: 1em;
      padding-top: 0;
    }

大部分情况下，不需要为简写形式的属性声明指定所有值。例如，`h1-h6` 元素只需要设置上、下边距（margin）的值，因此，一般只需覆盖这两个值就可以。 过度使用简写形式会对属性值带来不必要的覆盖从而引起意外的副作用。

常见的滥用简写属性声明的情况如下：

* `padding`
* `margin`
* `font`
* `background`
* `border`
* `border-radius`

demo

    /* Recommended */
    .element {
      margin-bottom: 10px;
      background-color: red;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    /* Not recommended */
    .element {
      margin: 0 0 10px; /* 只需要设置下边距而已 */
      background: red; /* 只需要设置背景颜色而已 */
      border-radius: 3px 3px 0 0;
    }

1.7 **属性值为 `0` 时省略单位**

    margin: 0;
    padding: 0;

1.8 **省略小数点前面的 `0`**

    font-size: .8rem;

1.9 **使用 `rem` 作为字号、长度单位**

使用 `px` 对可访性会造成一定的问题，`em` 则随着上下文不断变化，计算较为繁杂。

* 推荐使用 `rem`：[Font sizing with rem](http://snook.ca/archives/html_and_css/font-size-with-rem)
* 需要 `1px` 级别精准定位的，仍然使用 `px`；
* 需要根据字号变化的（如 `padding`、`margin` 等）场景使用可以使用 `em`，较少不必要的代码。

1.10 **`line-height` 不加单位**

需要精确控制的场景除外。

1.11 **使用十六进制颜色编码（`rgba()`除外）**

1.12 **简写可简写的十六进制颜色值**

    /* Recommended */
    color: #ebc;

    /* Not recommended */
    color: #eebbcc;

1.13 **根据项目在 ID、Class 前面加上特定前缀（命名空间）**

命名空间可以防止命名冲突，方便维护（查找和替换）。

    .adw-help {} /* AdWords */
    #maia-note {} /* Maia */

1.14 **使用连字符 - 作为 ID、Class 名称界定符**

CSS 中不要驼峰命名法和下划线。

    /* Recommended */
    #video-id {}
    .ads-sample {}

    /* Not recommended */
    .demoimage {} /* 没有分割 `demo` 和 `image` */
    .error_status {} /* 使用下划线链接 */
    .errorStatus {} /* 使用驼峰式命名 */

元素在页面中仅仅出现一次的，应该使用 ID，否则使用 Class。

1.15 **尽量避免 Hacks**

面向现代浏览器编写样式，针对过时浏览器的 Hack 可以放在单独的样式表中并使用条件注释引入。

移动开发针对 IE10+ 及其他现代浏览器，移除针对老版本 IE 的 Hack。

1.16 **Less / SCSS 编写**

* 使用 `;` 分割 Mixin 参数；
* 避免非必要的嵌套


- - -


## 2. CSS 代码格式

2.1 **属性声明顺序**

推荐的样式编写顺序：

1. Positioning
2. Box model
3. Typographic
4. Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型决定了组件的尺寸和位置，因此排在第二位。

其他属性只是影响组件的内部（`inside`）或者是不影响前两组属性，因此排在后面。

    .declaration-order {
      /* Positioning */
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;

      /* Box-model */
      display: block;
      float: right;
      width: 100px;
      height: 100px;
      border: 1px solid #e5e5e5;

      /* Typography */
      font: normal 13px "Helvetica Neue", sans-serif;
      line-height: 1.5;
      color: #333;
      text-align: center;

      /* Visual */
      background-color: #f5f5f5;
      border-radius: 3px;

      /* Misc */
      opacity: 1;
    }

**链接的样式请严格按照如下顺序添加：**
`a:link -> a:visited -> a:hover -> a:active（LoVeHAte）`

2.2 **代码块缩进**

缩进花括号（`{}`）之间的[代码块](http://www.w3.org/TR/CSS21/syndata.html#block)。

    @media screen {

      html {
       background: #fff;
       color: #444;
      }

    }

2.3 **声明的最后一行仍然添加分号**

代码压缩由部署工具完成，编写源代码时应该保持每一行代码的完整性。

    /* Recommended */
    .test {
      display: block;
      height: 100px;
    }

    /* Not recommended */
    .test {
      display: block;
      height: 100px /* 这一行没有分号 */
    }

2.4 **空格使用**

* 属性和值之间（`:`后面）用一个空格分隔。这样可以提高代码的可读性。
* 对于以逗号分隔的属性值，每个逗号后面都空一个格（如 `box-shadow`）。
* 不要在 `rgb()`、`rgba()`、`hsl()`、`hsla()` 或 `rect()` 值的内部的逗号后面添加空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。

demo

    /* Recommended */
    .selector,
    .selector-secondary,
    .selector[type="text"] {
      padding: 15px;
      margin-bottom: 15px;
      background-color: rgba(0,0,0,.5);
      box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
    }

    /* Not recommended */

    .selector{ /* 选择符和左花括号之间没有添加空格*/
      padding:15px; /* 冒号和值之间没有空格 */
      margin:0px 0px 15px;
      background-color:rgba(0, 0, 0, 0.5); /* 颜色值不加空格 */
      box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF; /* 逗号分隔的属性值应该添加空格 */
    }

2.5 **带前缀的属性**

当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑。

在 Textmate 中，使用 `Text` → `Edit Each Line in Selection (⌃⌘A)`；
在 Sublime Text 2 中，使用 `Selection` → `Add Previous Line (⌃⇧↑)` 和 `Selection` → `Add Next Line (⌃⇧↓)`。

demo

    /* Prefixed properties */
    .selector {
      -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
              box-shadow: 0 1px 2px rgba(0,0,0,.15);
    }

2.6 **声明块分隔**

最后一个选择器和起始花括号在一行，并用一个空格分隔。

    /* Recommended */
    #video {
     margin-top: 1em;
    }

    /* Not recommended: missing space */
    #video{ /* 选择器和花括号中间没有空格 */
      margin-top: 1em;
    }

    /* Not recommended: unnecessary line break */
    #video
    { /* 最后一个选择器和花括号之间换行了 */
      margin-top: 1em;
    }

2.7 **选择符、声明单独成行**

    /* Recommended */
    h1,
    h2,
    h3 {
      font-weight: normal;
      line-height: 1.2;
    }

    a:focus,
    a:active {
      position: relative;
      top: 1px;
    }

    /* Not recommended */
    a:focus, a:active {
      position: relative; top: 1px;
    }

2.8 **规则之间使用一空行分隔**

    html {
      background: #fff;
    }

    body {
      margin: auto;
      width: 50%;
    }

2.9 **闭合花括号单独成行**

    /* Recommended */
    h2 {
      font-size: 1.8rem;
    }

    /* Not recommended */
    h2 {
      font-size: 1.8rem;}

2.10 **引号使用**

`url()` 添加双引号。属性选择符、属性值使用**双引号**。

    /* Recommended */
    @import url("//www.google.com/css/maia.css");

    html {
      font-family: "open sans", arial, sans-serif;
    }

    .selector[type="text"] {

    }

    /* Not recommended */
    @import url(//www.google.com/css/maia.css);

    html {
      font-family: 'open sans', arial, sans-serif;
    }

2.11 **字体名称**

字体名称请映射成对应的英文名，例如：黑体(SimHei) 、宋体(SimSun) 、微软雅黑(Microsoft Yahei)。

**如果字体名称中有空格，则必须加引号。**


- - -


## 3. CSS 元数据规则

3.1 **按组编写注释**

组与组之间空一行，注释与对应组之间不空行（视具体情况约定）。

    /* Header */
    #adw-header {
    }

    /* Footer */
    #adw-footer {
    }

    /* Gallery */
    .adw-gallery {
    }

# HTML 风格指南


## 1. 编码规则

1.1 **文档类型（DTD）使用 HTML5**

    <!DOCTYPE html>

1.2 **语言属性**

    <html lang="zh-CN">

1.3 **IE 兼容模式设置为 `Edge`**

    <meta http-equiv="X-UA-Compatible" content="IE=Edge">

1.4 **HTML 有效性**

编写有效的 HTML 代码，能通过[代码校验工具](http://validator.w3.org/nu/)验证。使用符合 HTML5 规范的标签，不允许使用废弃的标签，如`<font>`、`<center>`等。

1.5 **语义化**

* 根据 HTML 各元素设计的用途使用他们。这事关可访性、重用以及代码效率，例如 `h1-h6` 用于标题，`<p>` 用于段落，`<a>` 用于链接。
* 使用 HTML5 语义化标签。

demo

    <!-- Recommended -->
    <a href="recommendations/">All recommendations</a>

    <!-- Not recommended -->
    <div onclick="goToRecommendations();">All recommendations</div>

1.6 **多媒体内容提供后备方案**

* 图片添加 `alt` 属性；视频、音频添加标题和文案说明。
* 备选内容是保障可访性的重要途径。
* 无法立即在 CSS 里设置的纯装饰图片将 `alt` 属性设置为空：`alt=""`。

demo

    <!-- Recommended -->
    <img src="spreadsheet.png" alt="Spreadsheet screenshot." />

    <!-- Not recommended -->
    <img src="spreadsheet.png" />

1.7 **关注分离：结构、表现、行为分离。**

严格保持结构 （标记），表现 （样式），和行为 （脚本）分离, 并尽量让三者之间的交互保持在最低限度。

* 确保文档和模板只包含 HTML 结构， 所有表现都放到样式表里，所有行为都放到脚本里；
* 尽量将脚本和样式合并到一个文件，减少外链。

关注分离对于可维护性至关重要，修改 HTML（结构）要比修改样式、脚本花费更多成本。

1.8 **不要用 HTML 实体**

使用 UTF-8 作为文件编码时，不需要使用 HTML 实体引用，如`&mdash;`、`&rdquo;`、`&#x263a;`。
在 HTML 文档中具有特殊含义的字符（如 `<` 和 `&`）例外，控制或不可见字符也例外（如不换行空格）。

    <!-- Recommended -->
    The currency symbol for the Euro is “€”.

    <!-- Not recommended -->
    The currency symbol for the Euro is &ldquo;&eur;&rdquo;.

1.9 **保留可选标签，保持结构完整性**

[HTML5 规范](http://www.whatwg.org/specs/web-apps/current-work/multipage/syntax.html#syntax-tag-omission)定义了一些标签可以省略，以保持代码简洁性。但我们要求保持结构的完整，不省略可省标签，闭合所有元素，以避免不同浏览器环境下不可预知的问题出现。

* `<br>`, `<hr>`, `<img>`, `<input>` 等自闭合（self-closing）标签都应该在结尾添加 `/`；
* 不要省略可选的结束标签（closing tag）（例如 `</li>` 或 `</body>`）。

1.10 **省略样式表和脚本的 `type` 属性**

使用 CSS 的样式表、使用 JavaScript 的脚本都不需要添加 `type` 属性。HTML5 默认按照 `text/css` 及 `text/javascript` 解析，兼容较老的浏览器。

1.11 **HTML 属性顺序**

HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

* `class`
* `id`, `name`
* `data-*`
* `src`, `for`, `type`, `href`
* `title`, `alt`
* `aria-*`, `role`

Class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，排在第二位。

1.12 **布尔值属性**

HTML5 规范中 `disabled`、`checked`、`selected` 等属性不用设置值（[via](https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes)）

    <input type="text" disabled>
    <input type="checkbox" value="1" checked>
    <select>
      <option value="1" selected>1</option>
    </select>

如果非要赋值，不要使用 `true`、`false`，值必须是空字符串或属性的规范名称，且不要在末尾添加空格。

    <input type="checkbox" checked name="cheese" disabled="disabled">
    /* or */
    <input type="checkbox" checked name="cheese" disabled="">

1.13 **JavaScript 生成的标签**

通过 JavaScript 生成的标签让内容变得不易查找、编辑，并且降低性能。能避免时尽量避免。

1.14 **其他细节**

* 使用 `<ul>`、`<ol>`、`<dl>` 组织列表，不要使用一堆 `<div>` 或者 `<p>`；
* 每个包含附加文字的表单输入框都应该利用 `<label>` 标签，特别是 `radio`、`checkbox`元素；
* 使用 `<label>` 标签包裹 `radio` / `checkbox`，不需要设置 `for` 属性；
* 避免写关闭标签注释，如 `<!-- /.element -->`，大多编辑器都支持开闭标签高亮；
* 不要手动设置 `tabindex`，浏览器会自动设置顺序。


- - -


## 2. HTML 代码格式

2.1 **基本格式**

每个块级、列表、表格元素单独占一行，每个子元素都相对父元素缩进。

    <blockquote>
      <p><em>Space</em>, the final frontier.</p>
    </blockquote>
    
    <ul>
      <li>Moe</li>
      <li>Larry</li>
      <li>Curly</li>
    </ul>
    
    <table>
      <thead>
        <tr>
          <th scope="col">Income</th>
          <th scope="col">Taxes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$ 5.00</td>
          <td>$ 4.50</td>
        </tr>
      </tbody>
    </table>

**纯文本在 HTML 标签结束之前不要换行。**

2.2 **表格**

恰当地使用 `<thead>`, `<tfoot>`, `<tbody>`, `<th>` 标签（注意：出于速度考虑，`<tfoot>` 应放在 `<tbody>`，以便在所有表格数据渲染完成之前显示 `<tfoot>`）。

    <table summary="This is a chart of invoices for 2011.">
      <thead>
        <tr>
          <th scope="col">Table header 1</th>
          <th scope="col">Table header 2</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td>Table footer 1</td>
          <td>Table footer 2</td>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>Table data 1</td>
          <td>Table data 2</td>
        </tr>
      </tbody>
    </table>

2.3 **HTML 属性值使用双引号**

不要省略属性值的引号，应始终添加双引号。

    <!-- Recommended -->
    <a class="maia-button maia-button-secondary">Sign in</a>

    <!-- Not recommended -->
    <a class='maia-button maia-button-secondary'>Sign in</a>

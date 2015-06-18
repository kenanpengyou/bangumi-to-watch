/*
 * help_template.js
 */

/*
 Example:
 <div class="help-article">
     <p>双击或长按上面的标题，可以修改文字。</p>
 </div>
 <a class="help-close" href="javascript:"><i class="icon-cancel"></i></a>
 */

module.exports = [
    '<div class="help-article"><%= content %></div>',
    '<a class="help-close" href="javascript:"><i class="icon-cancel"></i></a>'
].join("");

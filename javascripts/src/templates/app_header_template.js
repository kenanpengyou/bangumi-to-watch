/*
 * app_header_template.js
 */

/*
 Example:
 <div class="wrapper wrapper-header">
     <div id="app_title" class="header-title">ぺこ的节目单</div>
     <div class="header-control">
         <a class="control-help" href="javascript:"><i class="icon-help"></i></a>
         <a class="control-reset" href="javascript:"><i class="icon-off"></i></a>
     </div>
 </div>
 */

module.exports = [
    '<div class="wrapper wrapper-header">',
        '<div class="header-title"><%= title %></div>',
        '<div class="header-control">',
            '<a class="control-help" href="javascript:"><i class="icon-help"></i></a>',
            '<a class="control-reset" href="javascript:"><i class="icon-off"></i></a>',
        '</div>',
    '</div>'
].join("");

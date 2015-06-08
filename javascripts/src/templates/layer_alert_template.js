/*
 * layer_confirm_template.js
 */

/*
 Example:
 <div class="frame-box">
     <div class="box-main">
         <div class="note-text">请不要做奇怪的操作(= =)</div>
     </div>
     <div class="box-submit">
         <a class="submit-link submit-yes" href="javascript:">确定</a>
     </div>
 </div>
 */

module.exports = [
    '<div class="frame-box">',
        '<div class="box-main">',
            '<div class="note-text"><%= textMain %></div>',
        '</div>',
        '<div class="box-submit">',
            '<a class="submit-link submit-yes" href="javascript:"><%= layer.yes %></a>',
        '</div>',
    '</div>'
].join("\n");

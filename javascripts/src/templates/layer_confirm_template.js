/*
 * layer_confirm_template.js
 */

/*
 Example:
 <div class="frame-box">
     <div class="box-main">
         <div class="note-text">要重置应用吗？</div>
         <div class="note-sub-text">将清除本应用已保存的所有数据。</div>
     </div>
     <div class="box-submit">
         <a class="submit-link submit-no" href="javascript:">取消</a>
         <a class="submit-link submit-yes" href="javascript:">确定</a>
     </div>
 </div>
 */

module.exports = [
    '<div class="frame-box">',
        '<div class="box-main">',
            '<div class="note-text"><%= textMain %></div>',
            '<div class="note-sub-text"><%= textSub %></div>',
        '</div>',
        '<div class="box-submit">',
            '<a class="submit-link submit-no" href="javascript:"><%= layer.no %></a>',
            '<a class="submit-link submit-yes" href="javascript:"><%= layer.yes %></a>',
        '</div>',
    '</div>'
].join("");

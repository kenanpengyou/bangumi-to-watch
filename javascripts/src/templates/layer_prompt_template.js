/*
 * layer_prompt_template.js
 */

/*
 Example:
 <div class="frame-box">
     <div class="box-main">
         <div class="note-text">修改标题文字</div>
         <div class="input-container"><input class="layer-input" type="text" value="ぺこ的节目单"></div>
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
            '<div class="input-container"><input class="layer-input" type="text" value="<%= inputOrigin %>"></div>',
        '</div>',
        '<div class="box-submit">',
        '<a class="submit-link submit-no" href="javascript:"><%= layer.no %></a>',
        '<a class="submit-link submit-yes" href="javascript:"><%= layer.yes %></a>',
        '</div>',
    '</div>'
].join("");

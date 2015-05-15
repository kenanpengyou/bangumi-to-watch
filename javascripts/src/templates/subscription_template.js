/*
* subscription_template.js
*/

/*
Example:
<div class="subscription-item">
    <div class="subscription-bangumi">舰队Collection</div>
    <div class="subscription-handle"><a class="delete-mark" href="javascript:"><i class="icon-cancel"></i></a></div>
</div>
*/

module.exports = [
    '<div class="subscription-item">',
        '<div class="subscription-bangumi"><span class="bangumi-title"><%= title %></span><input class="subscription-input" type="text" value="<%= title %>"></div>',
        '<div class="subscription-handle"><a class="delete-mark" href="javascript:"><i class="icon-cancel"></i></a></div>',
    '</div>'
].join("\n");

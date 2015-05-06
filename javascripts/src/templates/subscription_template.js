/*
* subscription_template.js
*/

/*
Example:
<div class="subscription-item">
    <div class="subscription-bangumi">½¢¶ÓCollection</div>
    <div class="subscription-handle"><a class="delete-mark" href="javascript:"><i class="icon-cancel"></i></a></div>
</div>
*/

module.exports = [
    '<div class="subscription-item">',
        '<div class="reminder-bangumi"><%= title %></div>',
        '<div class="subscription-handle"><a class="delete-mark" href="javascript:"><i class="icon-cancel"></i></a></div>',
    '</div>'
].join("\n");

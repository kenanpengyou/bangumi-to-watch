/*
* note_reminder_template.js
*/

/*
Example:
<div class="reminder-item">
    <div class="reminder-bangumi">舰队Collection</div>
    <div class="reminder-date">04.27</div>
    <div class="reminder-handle"><a class="complete-mark" href="javascript:"><i class="icon-ok"></i></a></div>
</div>
*/

module.exports = [
    '<div class="reminder-item">',
        '<div class="reminder-date"><%= date %></div>',
        '<div class="reminder-bangumi"><%= title %></div>',
        '<div class="reminder-handle"><a class="complete-mark" href="javascript:" data-id="<%= id %>"><i class="icon-check-empty"></i></a></div>',
    '</div>'
].join("\n");

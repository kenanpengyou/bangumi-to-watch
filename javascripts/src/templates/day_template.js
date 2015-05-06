/*
* note_reminder_template.js
*/

/*
Example:
 <div class="day-item is-today">周一</div>
 <div class="day-item">周二</div>
*/

module.exports = [
    '<div class="day-item"><%= day %></div>'
].join("\n");

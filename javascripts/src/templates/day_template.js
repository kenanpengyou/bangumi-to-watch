/*
* note_reminder_template.js
*/

/*
Example:
 <div class="day-item is-today">��һ</div>
 <div class="day-item">�ܶ�</div>
*/

module.exports = [
    '<div class="day-item"><%= day %></div>'
].join("\n");

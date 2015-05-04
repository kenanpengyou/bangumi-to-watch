/*
 * note_reminders.js
 * ===== Collections =====
 */

var Backbone = require("backbone");
var NoteReminder = require("../models/note_reminder");
Backbone.LocalStorage = require("backbone.localstorage");

var NoteReminders = Backbone.Collection.extend({
    model: NoteReminder,
    localStorage: new Backbone.LocalStorage("bangumi-day-notes")
});

module.exports = NoteReminders;
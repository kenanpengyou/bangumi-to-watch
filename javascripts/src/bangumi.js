/*
* bangumi.js
*/

"use strict";

//--------------
// Libs.
//--------------
var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
Backbone.LocalStorage = require("backbone.localstorage");
Backbone.$ = $;

//--------------
// Model and collections.
//--------------
var TimeRecorders = require("./collections/time_recorders");
var DayNotes = require("./collections/day_notes");
var NoteReminders = require("./collections/note_reminders");

var timeRecorders = new TimeRecorders();
var dayNotes = new DayNotes();
var noteReminders = new NoteReminders(null, {
    dayNotes: dayNotes,
    timeRecorders: timeRecorders
});

//--------------
// Main Views
//--------------
var DayNoteDisplayView = require("./views/day_note_display_view");
var MainRemindersView = require("./views/main_reminders_view");

var dayNoteDisplayView = new DayNoteDisplayView({
    collection: dayNotes
});
var mainRemindersView = new MainRemindersView({
    collection: noteReminders,
    dayNotes: dayNotes
});


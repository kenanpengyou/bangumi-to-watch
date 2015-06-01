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
var NoteReminders = require("./collections/note_reminders");
var DayNotes = require("./collections/day_notes");

var timeRecorders = new TimeRecorders();
var dayNotes = new DayNotes();
var noteReminders = new NoteReminders(dayNotes, timeRecorders);

//--------------
// Views
//--------------
var DayNoteDisplayView = require("./views/day_note_display_view");
var NoteReminderView = require("./views/note_reminder_view");

var dayNoteDisplayView = new DayNoteDisplayView(dayNotes);
var noteReminderView = new NoteReminderView(noteReminders);
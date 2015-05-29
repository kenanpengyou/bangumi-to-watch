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
var TimeRecorder = require("./models/time_recorder");
var NoteReminders = require("./collections/note_reminders");
var DayNotes = require("./collections/day_notes");

var timeRecorder = new TimeRecorder();
var dayNotes = new DayNotes();
var noteReminders = new NoteReminders(dayNotes, timeRecorder);

//--------------
// Views
//--------------
var DayNoteDisplayView = require("./views/day_note_display_view");
var NoteReminderView = require("./views/note_reminder.view");

var dayNoteDisplayView = new DayNoteDisplayView(dayNotes);
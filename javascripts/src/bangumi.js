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
var MainProgramView = require("./views/main_program_view");
var MainRemindersView = require("./views/main_reminders_view");
var ControlSwitchView = require("./views/control_switch_view");

var mainProgramView = new MainProgramView({
    collection: dayNotes,
    hide: true
});
var mainRemindersView = new MainRemindersView({
    collection: noteReminders,
    dayNotes: dayNotes
});
var controlSwtichView = new ControlSwitchView();


/*
* bangumi.js
*/

//--------------
// Libs.
//--------------

// Pointer Events Polyfill by jQuery team (https://github.com/jquery/pep)
require("pepjs/dist/pep.js");
var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
Backbone.LocalStorage = require("backbone.localstorage");
Backbone.$ = $;

//--------------
// Model and collections.
//--------------
var Recorders = require("./collections/recorders");
var DayNotes = require("./collections/day_notes");
var NoteReminders = require("./collections/note_reminders");

var recorders = new Recorders();
var dayNotes = new DayNotes();
var noteReminders = new NoteReminders(null, {
    dayNotes: dayNotes,
    recorders: recorders
});

//--------------
// Main Views
//--------------
var AppHeaderView = require("./views/app_header_view");
var AppLayerView = require("./views/app_layer_view");
var MainProgramView = require("./views/main_program_view");
var MainRemindersView = require("./views/main_reminders_view");
var ControlSwitchView = require("./views/control_switch_view");

var appHeaderView = new AppHeaderView({
    collection: recorders
});
var appLayerView = new AppLayerView();
var mainProgramView = new MainProgramView({
    collection: dayNotes,
    hide: true
});
var mainRemindersView = new MainRemindersView({
    collection: noteReminders,
    dayNotes: dayNotes
});
var controlSwtichView = new ControlSwitchView();


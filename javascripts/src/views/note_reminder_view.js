/*
 * note_reminder_view.js
 */

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var TimeRecorder = require("./models/time_recorder");
var DayNotes = require("../collections/day_notes");
var NoteReminders = require("../collections/note_reminders");
var noteReminderTemplate = require("../templates/note_reminder_template");

//timeRecorder.fetch({
//    success: function(model, response, options){
//        console.log("[timeRecorder.fetch] model = ", model);
//        console.log("[timeRecorder.fetch] response = ", response);
//    },
//    error: function(model, response, options){
//
//    }
//});

var NoteReminderView = Backbone.View.extend({
    el: "#reminder_collection",

    initialize: function(){
        this.timeRecorder = new TimeRecorder();
        timeRecorder.fetch();
        this.generateNoteReminder();
    },
    templateOverview: _.template(noteReminderTemplate),

    render: function(){

    },

    // ------- custom below -------

    // The key function of this app. To generate note reminders between "now" and "last".
    generateNoteReminder: function(){
        var now = new Date().UTC();



    }

});
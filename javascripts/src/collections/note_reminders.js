/*
 * note_reminders.js
 * ===== Collections =====
 */

var Backbone = require("backbone");
var NoteReminder = require("../models/note_reminder");
Backbone.LocalStorage = require("backbone.localstorage");

var NoteReminders = Backbone.Collection.extend({
    model: NoteReminder,
    localStorage: new Backbone.LocalStorage("bangumi-day-notes"),
    initialize: function(dayNotes, timeRecorder){
        this.fetch();
        this.dayNotes = dayNotes;
        this.timeRecorder = timeRecorder;
        this.generateItems();
    },

    // The key function of this app. To generate note reminders between "now" and "last".
    generateItems: function(){
        var now = new Date().UTC(),
            last = this.timeRecorder.get("last"),
            dayInterval = 24 * 60 * 60 * 1000,
            dayNote = null,
            records = null,
            timestamp = 0,
            date = null,
            day = 0;

        // If "last" is 0, it means it's the first time to launch this app.
        // Of course, no note reminders will be generated.
        if(last === 0){
            return this.timeRecorder.reset(now);
        }

        // Review the period from "now" to "last", finish the work of each day.
        for(timestamp = last; timestamp < now; timestamp += dayInterval){
            date = new Date(timestamp);
            day = date.getDay();
            dayNote = this.dayNotes.findByDay(day);
            records = dayNote.getRecords();

            // Each record will create a note reminder.
            _.each(records, function(record){
                this.create({
                    title: record,
                    time: timestamp
                });
            }, this);
        }
    }
});

module.exports = NoteReminders;
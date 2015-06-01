/*
 * note_reminders.js
 * ===== Collections =====
 */

var Backbone = require("backbone");
var _ = require("underscore");
var NoteReminder = require("../models/note_reminder");
Backbone.LocalStorage = require("backbone.localstorage");

var NoteReminders = Backbone.Collection.extend({
    model: NoteReminder,
    localStorage: new Backbone.LocalStorage("bangumi-day-notes"),
    initialize: function(dayNotes, timeRecorders){
        this.fetch({reset: true});
        this.dayNotes = dayNotes;
        this.timeRecorders = timeRecorders;
        this.generateItems();
    },

    // The key function of this app. To generate note reminders between "now" and "last".
    generateItems: function(){
        var now = Date.now(),
            last = this.timeRecorders.getLast(),
            dayInterval = 24 * 60 * 60 * 1000,
            dayNote = null,
            records = null,
            timestamp = 0,
            date = null,
            day = 0;

        console.log("[Collections:NoteReminders:generateItems] last = ", new Date(last).toLocaleString());
        console.log("[Collections:NoteReminders:generateItems] now = ", new Date(now).toLocaleString());

        // If "last" is 0, it means it's the first time to launch this app.
        // Of course, no note reminders will be generated.

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
    },

    getUndoneItems: function(){
        return this.where({
            done: false
        });
    }
});

module.exports = NoteReminders;
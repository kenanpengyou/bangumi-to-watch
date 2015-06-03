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
    localStorage: new Backbone.LocalStorage("bangumi-note-reminders"),
    initialize: function(models, options){
        this.fetch({reset: true});
        this.dayNotes = options.dayNotes;
        this.timeRecorders = options.timeRecorders;
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

        tempFlag = false;

        // Be aware of that this app may be launched quite a few times within the same day, but the note reminders
        // should have no duplicate. Therefore, it's grateful to update only when the interval is more than 1 day.
        if(tempFlag || now - last > dayInterval){

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

            // After all finished, update "last".
            this.timeRecorders.update(now);
        }
    },

    getUndoneItems: function(){
        return this.where({
            done: false
        });
    }
});

module.exports = NoteReminders;
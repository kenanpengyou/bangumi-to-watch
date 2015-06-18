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
        this.recorders = options.recorders;
        this.generateItems();
    },

    // Descend by time is preferred.
    comparator: function(model){
        return model.get("time") * -1;
    },

    // This app cares about date, not accurate time. In consequence, formalize the timestamp to "00:00:00" of each day.
    formalizeTime: function(timestamp){
        var dateObject = new Date(timestamp),
            year = dateObject.getFullYear(),
            month = dateObject.getMonth(),
            date = dateObject.getDate(),
            convertedDate = new Date(year, month, date);

        return convertedDate.getTime();
    },

    // The key function of this app. To generate note reminders between "now" and "last".
    generateItems: function(){
        var now = Date.now(),
            formalizedNow = this.formalizeTime(now),
            formalizedLast = this.formalizeTime(this.recorders.getLast()),
            dayInterval = 24 * 60 * 60 * 1000,
            dayNote = null,
            records = null,
            timestamp = 0,
            date = null,
            day = 0;

        // Review the period from "now" to "last", finish the work of each day.
        for(timestamp = formalizedLast; timestamp <= formalizedNow; timestamp += dayInterval){
            date = new Date(timestamp);
            day = date.getDay();
            dayNote = this.dayNotes.findByDay(day);
            records = dayNote.getRecords();

            // Each record will create a note reminder.
            _.each(records, function(record){
                var attributes = {
                    title: record,
                    time: timestamp
                    },
                    match = [];

                // Be aware of that this app may be launched quite a few times within the same day,
                // but duplicate items should be avoided. Only the edge two days needs caring about.
                if(timestamp === formalizedLast || timestamp === formalizedNow){
                    match = this.where(attributes);

                    if(match.length === 0){
                        this.create(attributes);
                    }

                // Else, there are no chances that items are duplicated.
                }else{
                    this.create(attributes);
                }

            }, this);
        }

        // Update "last".
        this.recorders.update(now);
    },

    getUndoneItems: function(){
        return this.where({
            done: false
        });
    },

    // Remove all models and sync to local storage.
    resetSelf: function(){

        // As model.destroy() will modify the collection itself, it's better it create a clone for iteration.
        _.chain(this.models).clone().each(function(model){
            model.destroy();
        });
    },

    // All other collection's reset will be done here.
    resetAll: function(){
        this.resetSelf();
        this.dayNotes.resetSelf();
        this.recorders.resetSelf();
    }
});

module.exports = NoteReminders;
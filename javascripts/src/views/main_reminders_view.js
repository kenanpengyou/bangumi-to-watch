/*
 * day_view.js
 */

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var NoteReminderView = require("./note_reminder_view");

var MainReminders = Backbone.View.extend({
    el: "#main_reminders",
    initialize: function(options){
        this.noteReminderView = new NoteReminderView({
            collection: this.collection
        });
        this.dayNotes = options.dayNotes;
        this.initTimeNote();

        if(options.hide){
            this.hideEl();
        }
        dispatcher.on("switch:program", this.hideEl, this);
        dispatcher.on("switch:reminders", this.showEl, this);
    },
    initTimeNote: function(){
        var timeNoteEl = this.createTimeNoteEl();

        this.$el.prepend(timeNoteEl);
        return this;
    },

    // ------- custom below -------

    showEl: function(){
        this.$el.show();
    },

    hideEl: function(){
        this.$el.hide();
    },

    // Create this element:
    // <div class="time-note">2015.04.27 周一</div>
    createTimeNoteEl: function(){
        var dateObject = new Date(),
            year = dateObject.getFullYear(),
            month = dateObject.getMonth() + 1,
            date = dateObject.getDate(),
            noteString = "",
            el = null;

        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;
        noteString = year + "." + month + "." + date + " " + this.dayNotes.getDayNameByDay(dateObject.getDay());
        el = $('<div class="time-note">' + noteString + '</div>');
        return el;
    }

});

module.exports = MainReminders;

/*
 * note_reminder_view.js
 */

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var noteReminderTemplate = require("../templates/note_reminder_template");

var NoteReminderView = Backbone.View.extend({
    el: "#reminder_collection",

    initialize: function(noteReminders){
        this.noteReminders = noteReminders;
        this.render();
    },
    template: _.template(noteReminderTemplate),

    render: function(){

        // Only undone items will be rendered.
        var unDoneItems = this.noteReminders.getUndoneItems(),
        html = "";

        _.each(unDoneItems, function(item){

            html += this.template({
                title: item.get("title"),
                date: this.formatDate(item.get("time"))
            });

        }, this);

        this.$el.html(html);

        return this;
    },

    events: {

    },

    // ------- custom below -------

    // Convert a timestamp to a string like "04.27".
    formatDate: function(timestamp){
        var dateObject = new Date(timestamp),
        month = date.getMonth() + 1,
        date = date.getDate(),
        string = "";

        // "11" → "11" & "4" → "04"
        month = month < 10 ? "0" + month : month;
        string = month + "." + date;
        return string;
    }

});

module.exports = NoteReminderView;
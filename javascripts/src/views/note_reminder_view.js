/*
 * note_reminder_view.js
 */

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var noteReminderTemplate = require("../templates/note_reminder_template");

var NoteReminderView = Backbone.View.extend({
    el: "#reminder_collection",

    initialize: function(){

        // Alias.
        this.noteReminders = this.collection;
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
                date: this.formatDate(item.get("time")),
                id: item.get("id")
            });

        }, this);

        this.$el.html(html);

        return this;
    },

    events: {
        "click .reminder-item .complete-mark": "completeOne"
    },
    completeOne: function(event){
        var target = $(event.currentTarget),
            targetId = target.data("id"),
            model = this.noteReminders.get(targetId);

        console.log("[completeOne] targetId = ", targetId);
        model.done();
        this.render();
    },

    // ------- custom below -------

    // Convert a timestamp to a string like "04.27".
    formatDate: function(timestamp){
        var dateObject = new Date(timestamp),
        month = dateObject.getMonth() + 1,
        date = dateObject.getDate(),
        string = "";

        // "11" → "11" & "4" → "04"
        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;
        string = month + "." + date;
        return string;
    }

});

module.exports = NoteReminderView;
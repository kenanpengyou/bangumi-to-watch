/*
 * note_reminder_view.js
 */

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var i18n = require("../i18n/translation");
var noteReminderTemplate = require("../templates/note_reminder_template");

var NoteReminderView = Backbone.View.extend({
    el: "#reminder_collection",

    initialize: function(){

        // Alias.
        this.noteReminders = this.collection;
        this.render();

        this.listenTo(this.noteReminders, "change destroy", this.render);
        dispatcher.on("app:reset", this.resetAll, this);
    },
    template: _.template(noteReminderTemplate),

    render: function(){

        // Only undone items will be rendered.
        var unDoneItems = this.noteReminders.getUndoneItems(),
        html = "";

        if(unDoneItems.length === 0){
            html = '<div class="reminder-tips">' + i18n.tips.reminderNone + '</div>'

        }else{
            _.each(unDoneItems, function(item){

                html += this.template({
                    title: item.get("title"),
                    date: this.formatDate(item.get("time")),
                    id: item.get("id")
                });

            }, this);
        }



        this.$el.html(html);

        return this;
    },

    events: {
        "pointerup .reminder-item .complete-mark": "completeOne"
    },
    completeOne: function(event){
        var target = $(event.currentTarget),
            itemEl = target.parents(".reminder-item"),
            targetId = target.data("id"),
            model = this.noteReminders.get(targetId);

        target.addClass("is-checked");
        itemEl.fadeOut("slow", function(){
            model.done();
        });
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
    },

    resetAll: function(){
        this.noteReminders.resetAll();
    }
});

module.exports = NoteReminderView;
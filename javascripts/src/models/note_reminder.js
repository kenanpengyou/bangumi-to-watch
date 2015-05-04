/*
 * note_reminder.js
 * ===== Model =====
 */

var Backbone = require("backbone");

var NoteReminder = Backbone.Model.extend({
    defaults: {
        title: "have a cup of tea",
        date: "",
        done: false
    },
    done: function(){
        this.set("done", true);
        this.save();
    }
});

module.exports = NoteReminder;
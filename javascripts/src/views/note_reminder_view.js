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

    },
    templateOverview: _.template(noteReminderTemplate),

    render: function(){

    }

    // ------- custom below -------

});
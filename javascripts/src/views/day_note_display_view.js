/*
* day_note_display_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var DayView = require("./day_view");


var DayNoteDisplayView = Backbone.View.extend({
    el: "#day_note_display",
    initialize: function(){
        new DayView();
    },
    render: function(){
        return this;
    }
});

module.exports = DayNoteDisplayView;
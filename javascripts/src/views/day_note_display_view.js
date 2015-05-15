/*
* day_note_display_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var DayView = require("./day_view");
var SubscriptionView = require("./subscription_view");


var DayNoteDisplayView = Backbone.View.extend({
    el: "#day_note_display",
    initialize: function(){
        this.dayView = new DayView();
        this.subscriptionView = new SubscriptionView(this.dayView.getSelected());
    },
    render: function(){
        return this;
    }
});

module.exports = DayNoteDisplayView;
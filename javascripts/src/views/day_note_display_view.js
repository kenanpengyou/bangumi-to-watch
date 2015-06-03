/*
* day_note_display_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var DayView = require("./day_view");
var SubscriptionView = require("./subscription_view");


var DayNoteDisplayView = Backbone.View.extend({
    el: "#day_note_display",
    initialize: function(options){
        this.dayView = new DayView({
            collection: this.collection
        });
        this.subscriptionView = new SubscriptionView({
            collection: this.collection
        });
    },
    render: function(){
        return this;
    }
});

module.exports = DayNoteDisplayView;
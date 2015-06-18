/*
* day_note_display_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var dispatcher = require("../events/dispatcher");
var DayView = require("./day_view");
var SubscriptionView = require("./subscription_view");

var MainProgramView = Backbone.View.extend({
    el: "#main_program",
    initialize: function(options){
        this.dayView = new DayView({
            collection: this.collection
        });
        this.subscriptionView = new SubscriptionView({
            collection: this.collection
        });
        if(options.hide){
            this.hideEl();
        }

        dispatcher.on("switch:reminders", this.hideEl, this);
        dispatcher.on("switch:program", this.showEl, this);

    },
    render: function(){
        return this;
    },

    // ------- custom below -------

    showEl: function(){
        this.$el.show();
    },

    hideEl: function(){
        this.$el.hide();
    }
});

module.exports = MainProgramView;
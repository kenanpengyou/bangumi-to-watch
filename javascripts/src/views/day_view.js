/*
* day_view.js
*/

var Backbone = require("backbone");
var _ = require('underscore');
var dayTemplate = require("../templates/day_template");


var DayView = Backbone.View.extend({
    el: "#day_collection",
    initialize: function(){
        this.render();
    },
    template: _.template(dayTemplate),
    render: function(){

        /* Day view is set to be fixed 7 days. */
        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // A week has 7 days.
        _.each(days, function(day){
            dayNotes.create({
                day: day
            });
        });
        dayNotes.fetch();


    }
});

module.exports = DayView;
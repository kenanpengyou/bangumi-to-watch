/*
* day_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var i18n = require("../i18n/translation");

var DayView = Backbone.View.extend({
    el: "#day_collection",

    initialize: function(){
        this.today = this.mapDay(new Date().getDay());
        console.log("[DayView:initialize] this.today = ", this.today);
        this.selected = this.today;
        this.render();
    },
    render: function(){

        // Reference:
        // <div class="day-item is-today">周一</div>
        // <div class="day-item">周二</div>
        // <div class="day-item is-selected">周三</div>
        var html = "",
            dayName = "",
            today = this.today,
            selected = this.selected;

        _.each(this.days, function(item, index){
            var className = "day-item";

            if(today === index){
                className += " " + "is-today";
            }

            if(selected === index){
                className += " " + "is-selected";
            }

            dayName = i18n.day[item];
            html += '<div class="' + className + '" ' + 'data-index="' + index + '">' + dayName + '</div>';
        });

        this.$el.html(html);
        return this;
    },
    events: {
        "click .day-item": "changeSelected"
    },
    changeSelected: function(event){
        var index = $(event.target).data("index");

        if(this.selected !== index){
            this.selected = index;
            this.render();
            dispatcher.trigger("change:day", index);
        }
    },
    getSelected: function(){
        return this.selected;
    },

    // ------- custom below -------

    // Day view is set to be fixed 7 days.
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

    // Date.prototype.getDay() use 0 to represent "Sunday". However, I prefer "Monday" 1st (see above). Map them.
    // For example, 0 → 6, 2 → 1
    mapDay: function(dayNumber){
        return (dayNumber + 6) % 7;
    }

});

module.exports = DayView;
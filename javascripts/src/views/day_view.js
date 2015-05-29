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

    initialize: function(dayNotes){
        this.dayNotes = dayNotes;
        console.log("[DayView:initialize] this.today = ", this.today);
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

        _.each(this.dayNotes.days, function(item, index){
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
    }

    // ------- custom below -------

});

module.exports = DayView;
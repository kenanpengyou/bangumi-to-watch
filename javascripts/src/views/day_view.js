/*
* day_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");

var DayView = Backbone.View.extend({
    el: "#day_collection",

    initialize: function(){

        // Use a more intelligible alias.
        this.dayNotes = this.collection;
        this.render();
    },
    render: function(){

        // Reference:
        // <div class="day-item is-today">周一</div>
        // <div class="day-item">周二</div>
        // <div class="day-item is-selected">周三</div>
        var html = "",
            dayName = "",
            today = this.dayNotes.today,
            selected = this.dayNotes.selected;

        _.each(this.dayNotes.days, function(item, index){
            var className = "day-item";

            if(today === index){
                className += " " + "is-today";
            }

            if(selected === index){
                className += " " + "is-selected";
            }

            dayName = this.dayNotes.getDayName(item);
            html += '<div class="' + className + '" ' + 'data-index="' + index + '">' + dayName + '</div>';
        }, this);

        this.$el.html(html);
        return this;
    },
    events: {
        "click .day-item": "changeSelected"
    },
    changeSelected: function(event){
        var index = $(event.target).data("index");

        if(this.dayNotes.selected !== index){
            this.dayNotes.selected = index;
            this.render();
            this.dayNotes.trigger("change:day");
        }
    }

    // ------- custom below -------

});

module.exports = DayView;
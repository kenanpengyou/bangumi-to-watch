/*
* day_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var i18n = require("../i18n/translation");

var DayView = Backbone.View.extend({
    el: "#day_collection",

    initialize: function(){

        // Use a more intelligible alias.
        this.dayNotes = this.collection;
        this.render();
        this.initToday();
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

        this.dayEls = this.$(".day-item");

        return this;
    },
    events: {
        "pointerup .day-item": "changeSelected",
        "pointerenter .is-today": "displayToday",
        "pointerleave .is-today": "displayToday"
    },
    changeSelected: function(event){
        var index = $(event.target).data("index");

        if(this.dayNotes.selected !== index){
            this.dayNotes.selected = index;
            this.dayEls.removeClass("is-selected").eq(index).addClass("is-selected");
            this.dayNotes.trigger("change");
        }
    },
    displayToday: function(event){
        var target = $(event.currentTarget);

        switch(event.type){
            case "pointerenter":
                target.text(target.data("originName"));
                break;
            case "pointerleave":
                target.text(target.data("todayName"));
        }
    },

    // ------- custom below -------

    // Display the correct "today" name.
    initToday: function(){
        var todayEl = this.$(".is-today"),
            originName = todayEl.text(),
            todayName = i18n.day["today"];

        todayEl.data("originName", originName)
            .data("todayName", todayName)
            .text(todayName);
    }

});

module.exports = DayView;
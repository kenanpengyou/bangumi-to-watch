/*
 * day_notes.js
 * ===== Collections =====
 * It's a collection with several fixed options since there are constantly 7 days in a week.
 */

var Backbone = require("backbone");
var _ = require("underscore");
var DayNote = require("../models/day_note");
Backbone.LocalStorage = require("backbone.localstorage");

var DayNotes = Backbone.Collection.extend({
    model: DayNote,
    localStorage: new Backbone.LocalStorage("bangumi-day-notes"),
    initialize: function(){
        var today = this.mapDay(new Date().getDay());

        this.fetch({reset: true});

        // The collection should have fixed 7 items, if not, create them.
        if(this.length < 7){
            _.each(this.days, function(day){
                this.create({
                    day: day
                });
            }, this);
        }

        // Today will be the default selected.
        this.selected = today;
    },

    // ------- custom below -------

    // Get current selected day note.
    getSelected: function(){
        return this.at(this.selected);
    },

    setSelected: function(index){
        
    },

    // Constant day names in a week.
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

    // Date.prototype.getDay() use 0 to represent "Sunday". However, I prefer "Monday" 1st (see above).
    // This will be a map helper function. For example, 0 → 6, 2 → 1
    mapDay: function(dayNumber){
        return (dayNumber + 6) % 7;
    },

    // Passing "0" will get the right day note model which is "Sunday".
    findByDay: function(dayNumber){
        var day = this.days[this.mapDay(dayNumber)];
        return this.findWhere({
            day: day
        });
    }

});

module.exports = DayNotes;
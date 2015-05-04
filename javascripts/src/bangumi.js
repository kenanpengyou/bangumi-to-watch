/*
* bangumi.js
*/

"use strict";

//--------------
// Libs.
//--------------
var Backbone = require("backbone");
var $ = require("jquery");
var _ = require("underscore");
Backbone.LocalStorage = require("backbone.localstorage");
Backbone.$ = $;


//--------------
// Time init.
//--------------
var TimeRecorder = require("./models/time_recorder");
var timeRecorder = new TimeRecorder();
timeRecorder.fetch({
    success: function(model, response, options){
        console.log("[timeRecorder.fetch] model = ", model);
        console.log("[timeRecorder.fetch] response = ", response);
    },
    error: function(model, response, options){

    }
});

//--------------
// Day notes.
//--------------
var DayNotes = require("./collections/day_notes");
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayNotes = new DayNotes();

// A week has 7 days.
_.each(days, function(day){
    dayNotes.create({
        day: day
    });
});
dayNotes.fetch();

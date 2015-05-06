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
// Templates.
//--------------
var templates = require("./templates/all");

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


//--------------
// Note reminder.
//--------------

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
// Day note display.
//--------------
var DayNoteDisplayView = require("./views/day_note_display_view");
var dayNoteDisplayView = new DayNoteDisplayView();

//--------------
// Note reminder.
//--------------

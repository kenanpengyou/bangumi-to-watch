/*
 * day_notes.js
 * ===== Collections =====
 */

var Backbone = require("backbone");
var _ = require("underscore");
var DayNote = require("../models/day_note");
Backbone.LocalStorage = require("backbone.localstorage");

var DayNotes = Backbone.Collection.extend({
    model: DayNote,
    localStorage: new Backbone.LocalStorage("bangumi-day-notes")
});

module.exports = DayNotes;
/*
 * time_recorder.js
 * ===== Model =====
 */

var Backbone = require("backbone");
Backbone.LocalStorage = require("backbone.localstorage");

var TimeRecorder = Backbone.Model.extend({
    defaults: {
        start: 0,
        last: 0
    },
    localStorage: new Backbone.LocalStorage("bangumi-time-recorder")
});

module.exports = TimeRecorder;
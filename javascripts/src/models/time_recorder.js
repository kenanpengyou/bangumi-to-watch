/*
 * time_recorder.js
 * ===== Model =====
 */

var Backbone = require("backbone");
var _ = require("underscore");
Backbone.LocalStorage = require("backbone.localstorage");

var TimeRecorder = Backbone.Model.extend({
    defaults: {
        start: 0,
        last: 0
    }
});

module.exports = TimeRecorder;
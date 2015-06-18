/*
 * recorder.js
 * ===== Model =====
 */

var Backbone = require("backbone");
var _ = require("underscore");
Backbone.LocalStorage = require("backbone.localstorage");

var Recorder = Backbone.Model.extend({
    defaults: {
        start: 0,
        last: 0,
        title: ""
    }
});

module.exports = Recorder;
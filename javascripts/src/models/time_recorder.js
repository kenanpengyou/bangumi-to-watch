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
    },
    localStorage: new Backbone.LocalStorage("bangumi-time-recorder"),
    initialize: function(){
        this.fetch();
    },
    update: function(timestamp){
        this.set("last", timestamp);
        return this;
    },
    reset: function(timestamp){
        this.set("last", timestamp);
        this.set("start", timestamp);
        return this;
    }
});

module.exports = TimeRecorder;
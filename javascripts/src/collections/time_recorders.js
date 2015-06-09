/*
 * time_recorders.js
 * ===== Collections =====
 * This collection has only one model in design.
 */

var Backbone = require("backbone");
var _ = require("underscore");
var TimeRecorder = require("../models/time_recorder");
Backbone.LocalStorage = require("backbone.localstorage");

var TimeRecorders = Backbone.Collection.extend({
    model: TimeRecorder,
    localStorage: new Backbone.LocalStorage("bangumi-time-recorder"),
    initialize: function(){
        var now = null;

        this.fetch({reset: true});

        // If there is not a time recorder yet, create one.
        if(this.length < 1){
            now = Date.now();
            this.create({
                start: now,
                last: now
            });
        }
    },
    getLast: function(){
        var target = this.at(0);

        return target.get("last");
    },
    getStart: function(){
        var target = this.at(0);
        return target.get("start");
    },
    update: function(timestamp){
        var target = this.at(0);
        target.set("last", timestamp).save();
        return this;
    },
    restart: function(timestamp){
        var target = this.at(0);
        target.set("last", timestamp).save();
        target.set("start", timestamp).save();
        return this;
    },
    resetSelf: function(){
        var now = Date.now();
        this.restart(now);
        return this;
    }
});

module.exports = TimeRecorders;
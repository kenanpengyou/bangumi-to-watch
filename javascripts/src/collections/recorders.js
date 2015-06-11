/*
 * recorders.js
 * ===== Collections =====
 * This collection has only one model in design.
 */

var Backbone = require("backbone");
var _ = require("underscore");
var Recorder = require("../models/recorder");
var i18n = require("../i18n/translation");
Backbone.LocalStorage = require("backbone.localstorage");

var Recorders = Backbone.Collection.extend({
    model: Recorder,
    localStorage: new Backbone.LocalStorage("bangumi-recorder"),
    initialize: function(){
        var now = null;

        this.fetch({reset: true});

        // If there is not a time recorder yet, create one.
        if(this.length < 1){
            now = Date.now();
            this.create({
                start: now,
                last: now,
                title: i18n.initTitle
            });
        }
    },
    getTitle: function(title){
        var target = this.at(0);

        return target.get("title");
    },
    modifyTitle: function(title){
        var target = this.at(0);
        target.set("title", title).save();

        return this;
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

module.exports = Recorders;
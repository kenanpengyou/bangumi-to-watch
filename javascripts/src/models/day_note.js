/*
 * day_note.js
 * ===== Model =====
 */

var Backbone = require("backbone");
var _ = require("underscore");

var DayNote = Backbone.Model.extend({
    defaults: {
        day: "Sunday",
        records: []
    },
    addRecord: function(record){
        this.records.push(record);
    },
    removeRecord: function(record){
        var index = _.indexOf(this.records, record);

        if(index > -1){
            this.records.splice(index, 1);
        }
    }
});

module.exports = DayNote;
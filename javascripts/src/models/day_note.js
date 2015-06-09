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
        var records = this.get("records");
        records.push(record);
        return this.save();
    },
    modifyRecord: function(originRecord, newRecord){
        records = this.get("records");
        index = _.indexOf(records, originRecord);

        if(index > -1){
            records.splice(index, 1, newRecord);
        }
        return this.save();
    },
    removeRecord: function(record){
        var records = this.get("records");
        index = _.indexOf(records, record);

        if(index > -1){
            records.splice(index, 1);
        }
        return this.save();
    },

    // Create a clone for the array "records".
    getRecords: function(){
        return _.map(this.get("records"), function(item){return item;});
    },

    // Clear the array "records".
    clearRecords: function(){
        return this.set("records", []).save();
    }
});

module.exports = DayNote;
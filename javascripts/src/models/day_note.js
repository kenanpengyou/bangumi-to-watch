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

    // The array "records" has a max limitation of 99.
    isFull: function(){
        return this.get("records").length >= 99;
    },
    addRecord: function(record){
        var records = this.get("records");

        // Records of the same day should not be duplicate.
        if(records.indexOf(record) === -1){
            records.push(record);
            this.save();
        }

        return this;
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
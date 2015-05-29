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
        return this;
    },
    modifyRecord: function(originRecord, newRecord){
        records = this.get("records");
        index = _.indexOf(records, originRecord);

        if(index > -1){
            records.splice(index, 1, newRecord);
        }
        return this;
    },
    removeRecord: function(record){
        var records = this.get("records");
        index = _.indexOf(records, record);

        if(index > -1){
            records.splice(index, 1);
        }
        return this;
    },

    // Create a clone for the array "records".
    getRecords: function(){
        return _.map(this.get("records"), function(item){return item;});
    }
});

module.exports = DayNote;
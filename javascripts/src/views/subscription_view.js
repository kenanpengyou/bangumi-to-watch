/*
* subscription_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var dispatcher = require("../events/dispatcher");
var DayNotes = require("../collections/day_notes");
var subscriptionOverviewTemplate = require("../templates/subscription_overview_template");
var subscriptionTemplate = require("../templates/subscription_template");

var SubscriptionView = Backbone.View.extend({
    el: "#subscription_display",

    initialize: function(index){

        this.dayNotes = new DayNotes();
        this.dayNotes.fetch({reset: true});

        console.log("[subscriptionView:initialize] this.dayNotes = ", this.dayNotes);

        // dayNotes should have fixed 7 items, if not, initialize it.
        if(this.dayNotes.length < 7){
            _.each(this.days, function(day){
               this.dayNotes.create({
                   day: day
               });
            }, this);
        }

        this.selected = index;
        this.render();

        dispatcher.on("change:day", this.changeSelected, this);
    },
    templateOverview: _.template(subscriptionOverviewTemplate),
    templateItem:  _.template(subscriptionTemplate),

    // When rendering, only the given index one (in collection "this.dayNotes") will be used.
    render: function(){
        var html = "",
        model = this.dayNotes.at(this.selected),
        records = model.get("records");

        // Two parts, overview and subscription items.
        html += this.templateOverview({
           count: records.length
        });

        // Items container (collection) for records.
        html += '<div class="subscription-collection">';

        if(records.length > 0){
            _.each(records, function(record){
                html += this.templateItem({
                   title: record
                });
            },this);
        }

        html += '</div>';

        this.$el.html(html);

        // Leave a reference to some key elements.
        this.collectionEl = this.$(".subscription-collection");

        // Reset some status.
        this.isAdding = false;

        return this;
    },
    events: {
        "dblclick .subscription-item": "modifyItem",
        "click .subscription-edit": "toggleEditing",
        "click .subscription-add": "prepareAdding",
        "click .subscription-collection.is-editing .delete-mark": "deleteItem",
        "keyup .subscription-item.is-editing .subscription-input": "helpInput",
        "blur .subscription-item.is-editing .subscription-input": "closeInput"
    },
    toggleEditing: function(event){
        this.collectionEl.addClass("is-gradual").toggleClass("is-editing");
    },
    deleteItem: function(event){
        var targetRecord = $(event.currentTarget).data("record"),
            model = this.dayNotes.at(this.selected);

        model.removeRecord(targetRecord).save();
        this.render();
    },
    modifyItem: function(event){
        var target = $(event.currentTarget),
            titleEl = target.find(".bangumi-title"),
            titleText = titleEl.text(),
            properWidth = titleEl.width();

        this.createHelpEl();

        // Store the input el for upcoming usage.
        this.editingInputEl = target.find(".subscription-input");
        target.addClass("is-editing");
        this.editingInputEl.width(properWidth).data("origin-record", titleText).val(titleText).focus();
    },
    prepareAdding: function(event){
        var newSubscription = null;

        // Be sure that there is only one adding at a time.
        if(this.isAdding){
            return;
        }

        this.createHelpEl();

        newSubscription = $(this.templateItem({
            title: ""
        }));

        // Use the class name "is-new" to identify it.
        newSubscription.addClass("is-editing").appendTo(this.collectionEl);
        this.editingInputEl = newSubscription.find(".subscription-input").addClass("is-new").focus();
        this.collectionEl.removeClass("is-gradual").removeClass("is-editing");
        this.isAdding = true;
    },

    // Auto increase the input width.
    helpInput: function(event){
        var inputEl = $(event.currentTarget),
            keyCode = event.keyCode,
            value = inputEl.val(),
            valueWidth = this.helpEl.text(value).width(),

            // A fixed width to leave some space.
            spareWidth = this.config.inputSpareWidth,
            minWidth = this.config.minInputWidth,
            maxWidth = this.config.maxInputWidth,
            properWidth = 0;

        if(valueWidth > minWidth && valueWidth < maxWidth){
            properWidth = valueWidth;
        }else if(valueWidth >= maxWidth){
            properWidth = maxWidth;
        }

        if(properWidth !== 0){
            inputEl.width(properWidth + spareWidth);
        }

        // If "enter" pressed, close this input.
        if(keyCode === 13){
            this.closeInput();
        }
    },

    // Save input after blur.
    closeInput: function(){
        var inputEl = this.editingInputEl,
            value = inputEl.val(),
            isNew = inputEl.hasClass("is-new"),
            originRecord = inputEl.data("origin-record") || "",
            model = this.dayNotes.at(this.selected);

        if($.trim(value) !== ""){

            if(isNew){
                model.addRecord(value);
            }else if(originRecord !== value){
                model.modifyRecord(originRecord, value);
                inputEl.removeData("origin-record");
            }
            model.save();
        }

        this.isAdding = false;
        this.removeHelpEl();
        this.render();
    },

    // ------- custom below -------
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    config: {
        minInputWidth: 30,
        maxInputWidth: 180,
        inputSpareWidth: 10,
        helpFontSize: 12
    },

    // Change selected day.
    changeSelected: function(index){
        this.selected = index;
        this.render();
    },

    createHelpEl: function(){
        // An element to help evaluate the proper width for input.
        this.helpEl = $("<div></div>").css({
            position: "absolute",
            visibility: "hidden",
            fontSize: this.config.helpFontSize
        }).appendTo("body");
    },
    removeHelpEl: function(){
        this.helpEl.remove();
    }
});

module.exports = SubscriptionView;
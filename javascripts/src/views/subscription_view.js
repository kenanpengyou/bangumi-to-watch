/*
* subscription_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
var i18n = require("../i18n/translation");
var dispatcher = require("../events/dispatcher");
var subscriptionOverviewTemplate = require("../templates/subscription_overview_template");
var subscriptionTemplate = require("../templates/subscription_template");

var SubscriptionView = Backbone.View.extend({
    el: "#subscription_display",

    initialize: function(){

        // Use a more intelligible alias.
        this.dayNotes = this.collection;
        this.render();
        this.listenTo(this.dayNotes, "change", this.render)
    },
    templateOverview: _.template(subscriptionOverviewTemplate),
    templateItem:  _.template(subscriptionTemplate),

    // When rendering, only the given index one (in collection "this.dayNotes") will be used.
    render: function(){
        var html = "",
        model = this.dayNotes.getSelectedItem(),
        records = model.get("records"),
        isEditing = this.collectionEl ? this.collectionEl.hasClass(".is-editing") : false;

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

        if(isEditing){
            this.collectionEl.addClass("is-editing");
        }

        // Reset some status.
        this.isAdding = false;

        return this;
    },
    events: {
        "dblclick .subscription-item": "modifyItem",
        "pointerdown .subscription-item": "detectItemLongPress",
        "pointerup .subscription-item": "detectItemLongPress",
        "pointerup .subscription-edit": "toggleEditing",
        "pointerdown .subscription-add": "detectAdd",
        "pointerup .subscription-add": "detectAdd",
        "pointerup .subscription-collection.is-editing .delete-mark": "deleteItem",
        "keyup .subscription-item.is-editing .subscription-input": "helpInput",
        "blur .subscription-item.is-editing .subscription-input": "closeInput"
    },

    // When "pointerdown" and "pointerup" are both "return false" (prevent default), "click" won't be fired (which may
    // cause "blur" after manually setting a focus input) in a normal interaction.
    detectAdd: function(event){

        if(event.type === "pointerup"){
            this.prepareAdding();
        }
        return false;
    },

    // For touch devices, "double click" won't be fired anyway. Try using a long press to replace it.
    detectItemLongPress: function(event){
        var timeLimit = 500;

        if(event.type === "pointerdown"){
            this.pressFlag = setTimeout(_.bind(this.modifyItem, this, event), timeLimit);
        }else if(event.type === "pointerup"){
            clearTimeout(this.pressFlag);
        }

        return false;
    },
    toggleEditing: function(event){
        this.collectionEl.addClass("is-gradual").toggleClass("is-editing");
    },
    deleteItem: function(event){
        var target = $(event.currentTarget),
            targetRecord = target.data("record"),
            itemEl = target.parents(".subscription-item"),
            model = this.dayNotes.getSelectedItem(),
            confirmFn = function(){
                this.executeDelete(itemEl, model, targetRecord);
            };

        dispatcher.trigger("layer:confirm", {
           textMain: i18n.control.deleteMain,
           fn: confirmFn,
           context: this
        });
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
            model = this.dayNotes.getSelectedItem();

        if($.trim(value) !== ""){

            if(isNew){

                if(model.isFull()){
                    dispatcher.trigger("layer:alert", {
                        textMain: i18n.control.recordsFull
                    });
                }else{
                    model.addRecord(value);
                }
            }else if(originRecord !== value){
                model.modifyRecord(originRecord, value);
                inputEl.removeData("origin-record");
            }
        }

        this.isAdding = false;
        this.removeHelpEl();
        this.render();
    },

    // ------- custom below -------
    config: {
        minInputWidth: 30,
        maxInputWidth: 180,
        inputSpareWidth: 10,
        helpFontSize: 12
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
    },
    executeDelete: function(itemEl, model, record){
        var that = this;

        itemEl.fadeOut("slow", function(){
            model.removeRecord(record).save();
            that.render();
        });
    }
});

module.exports = SubscriptionView;
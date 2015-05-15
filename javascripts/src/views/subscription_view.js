/*
* subscription_view.js
*/

var Backbone = require("backbone");
var _ = require("underscore");
var $ = require("jquery");
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
                   //records: ["Fate stay night UBW", "jojo的奇妙冒险"]
               });
            }, this);
        }

        this.render(index);
    },
    templateOverview: _.template(subscriptionOverviewTemplate),
    templateItem:  _.template(subscriptionTemplate),

    // When rendering, only the given index one (in collection "this.dayNotes") will be used.
    render: function(index){
        var html = "",
        model = this.dayNotes.at(index),
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
        this.collectionNode = this.$(".subscription-collection");

        // Reset some status.
        this.isAdding = false;

        return this;
    },
    events: {
        "click .subscription-edit": "toggleEditing",
        "click .subscription-add": "prepareAdding",
        "keyup .subscription-item.is-editing .subscription-input": "helpInput"
    },
    toggleEditing: function(event){
        this.$(".subscription-collection").toggleClass("is-editing");
    },
    prepareAdding: function(event){
        var newSubscription = null;

        if("go"){
            newSubscription = $(this.templateItem({
                title: ""
            }));
        }
        newSubscription.addClass("is-editing").appendTo(this.collectionNode);
        newSubscription.find(".subscription-input").focus();
    },

    // ------- custom below -------
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

});

module.exports = SubscriptionView;
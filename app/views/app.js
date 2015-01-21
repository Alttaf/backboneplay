define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'events',
    'text!templates/layout.html'
], function($, _, Backbone, Vm, Events, layoutTemplate) {
    var AppView = Backbone.View.extend({
        el: '.container',
        initialize: function() {
        this.render();
        },
        render: function() {
            var that = this;
            that.$el.html(layoutTemplate);
        }
    });

    return AppView;


});

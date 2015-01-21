// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'vm'
], function($, _, Backbone, Vm) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Pages
            'sendMessage': 'sendMessage',
            'calculate' : 'calculate',
            'daysOfWeek':'daysOfWeek',
            'showStores':'showStores',
    
            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(options) {
        var appView = options.appView;
        var router = new AppRouter(options);
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        options.crossDomain ={
          crossDomain: true
        };
        });

        router.on('route:sendMessage', function(parameters) {

                require(['views/sendMessage'], function(SendMessageView) {
                var view = Vm.create(appView, 'sendMessage', SendMessageView);
                view.render();
           });

        });

        router.on('route:calculate', function(parameters) {

                require(['views/calculate'], function(CalculateView) {
                var view = Vm.create(appView, 'calculate', CalculateView);
                view.render();
           });

        });
        
        router.on('route:daysOfWeek', function(parameters) {

                require(['views/daysOfWeek'], function(DaysOfWeekView) {
                var view = Vm.create(appView, 'daysOfWeek', DaysOfWeekView);
                view.render();
                });

        });
        
        router.on('route:showStores', function(parameters) {

        require(['views/showStores'], function(showStoresView) {
        var view = Vm.create(appView, 'showStores', showStoresView);
        view.render();
        });

        });

        router.on('route:defaultAction', function(actions) {
           
           
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
define([
    'jquery',
    'lodash',
    'backbone',
    'text!templates/dashboard/page.html'
], function($, _, Backbone, template) {
    var DashboardPage = Backbone.View.extend({
        el: '.page',
                
        render: function() {

            $(this.el).html(template);
        }
    });
    return DashboardPage;
});

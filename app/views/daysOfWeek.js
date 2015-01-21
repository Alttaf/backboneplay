define([
    'lodash',
    'backbone',
    'jquery',
    'text!templates/modules/daysOfWeek.html'
  ], function (_, Backbone, $, template) {
  var DaysOfWeekView = Backbone.View.extend({
      el : '.content',

      initialize : function () {
        this.today = new Date().getDay();
        this.daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        //prepare the array, this could easily be re arranged above but don't want to cheat :D
        var x = this.daysOfTheWeek.pop();
        this.daysOfTheWeek.unshift(x);
      },

      nextSevenDays : function () {
        var array = this.daysOfTheWeek.splice(0, this.today);
        return this.daysOfTheWeek.concat(array).join(",");
      },

      render : function () {
        $(this.el).html(template);
        $('#days').html(this.nextSevenDays());
      }
    });

  return DaysOfWeekView;
});
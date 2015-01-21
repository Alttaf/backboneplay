define([
    'underscore',
    'backbone',
    'jquery',
    'text!templates/modules/calculate.html',
    'models/calculateModel'
  ], function (_, Backbone, $, template, mod) {
  console.log(mod);
  var CalculateView = Backbone.View.extend({
      el : '.content',
      events : {
        'click #sendButton' : 'renderResults'
      },
      dividend : 5,
      initialize : function () {
        this.model = new mod();
        console.log(this.model);
        this.model.bind("validate", this.validate);
      },
      calculate : function (dividend) {
        console.log(dividend);
        var divisor = $('#inputNumber').val();
        return (dividend / divisor);

      },

      renderResults : function (e) {
        e.preventDefault();
        var that = this;
        options = {
          success : function (model, errors) {
            that.noErrorsOnValidate();
          },
          error : function (errors) {
            that.errorsOnValidate(errors);
          }
        };
        var divisor = $('#inputNumber').val();
        that.model.validate({
          name : "dividend",
          value : divisor,
          message : "Error dividend divisor value"
        }, options);

      },

      noErrorsOnValidate : function () {
        $('.control-group').removeClass('error');
        $('#result').html('The answer is ' + this.calculate(this.dividend));
      },

      errorsOnValidate : function (error) {
        var controlGroup = this.$('.' + error.name);
        controlGroup.addClass('error');
        controlGroup.find('.help-inline').text(error.message);

      },

      render : function () {

        $(this.el).html(template);
        $('.dividend-value').html(this.dividend);
      }
    });

  return CalculateView;
});
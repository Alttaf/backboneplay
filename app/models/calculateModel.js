define([
    'jquery',
    'underscore',
    'backbone'
  ], function ($, _, Backbone) {
  var Validate = Backbone.Model.extend({
      validate : function (attr, options) {
        var input = parseFloat(attr.value);
        if (input != 0 && !isNaN(input) && isFinite(input) && (typeof input) == "number") {
          options.success();
        } else {

          options.error(attr);
        }
      }

    });

  return Validate;
});
define([
    'jquery',
    'underscore',
    'backbone',
    'models/showStoresModel'
  ], function ($, _, Backbone, show) {

  var Store = Backbone.Collection.extend({
      model : show,
      url : '//cloudservices.arcadiagroup.co.uk/storestock/storestock?brand=12556&dist=50&res=5&jsonp_callback=?&lat=51.511&long=-0.1198',
      // Overwrite the sync method to pass over the Same Origin Policy
      initialize : function () {
        console.log(this);
      },

      sync : function (method, collection, options) {
        // By setting the dataType to "jsonp", jQuery creates a function
        // and adds it as a callback parameter to the request, e.g.:
        // [url]&callback=jQuery19104472605645155031_1373700330157
        // If you want another name for the callback, also specify the
        // jsonpCallback option.
        // After this function is called (by the JSONP response), the script tag
        // is removed and the parse method is called, just as it would be
        // when AJAX was used.
        options.dataType = "jsonp";
        return Backbone.sync(method, collection, options);
      },
      parse : function (response) {
        //console.log(response.stores.store);
        return response.stores.store;
      },
    });

  return Store;
});
define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'text!templates/modules/sendMessage.html'
  ], function ($, _, Backbone, template, sendMessageTemplate) {
      console.log(_);

      var SendMessageView = Backbone.View.extend({
          el : '.content',
          events : {
            'click #sendButton' : 'display'
          },
          my_template : _.template(sendMessageTemplate, {}),
          initialize : function () {
            console.log(_);
            this.render();
          },
          render : function () {
            console.log(this);
            var template = this.my_template;
            this.$el.html(template);
          },
          display : function () {
            $('#result').html("You sent '" + $('#messageText').val() + "' to this view");
          }
        });

      return SendMessageView;
});
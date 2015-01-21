define([
    'underscore',
    'backbone',
    'jquery',
    'text!templates/modules/showStores.html',
    // 'text!templates/modules/showStoresTable.html', does not work not sure why?
    'collections/showStoresCollection',
    'models/showStoresModel'
], function(_, Backbone, $, template, /*rowTempl,*/ mod) {
        console.log(mod);
        console.log(template);
   var microTemplate="<table class='table table-bordered'><thead><tr><th>storeName</th><th>telephoneNumber</th><th>address1</th><th>address2</th><th>address3</th></tr></thead><tbody><% _.each(obj, function(index) { %> <tr><td class='name'><%= index.storeName %></td><td class='age'><%= index.telephoneNumber %></td><td class='age'><%= index.address1 %></td><td class='age'><%= index.address2 %></td><td class='age'><%= index.address3 %></td></tr><% }); %></tbody></table>";
    _.templateSettings.variable = "rc";
    var showStoresView = Backbone.View.extend({
        el: '.content',
       // rowTemplate:_.template(rowTempl,{}),
        dividend : 5,
        my_template:_.template(template,{}),
        initialize : function() {
            _.bindAll(this,'render');
            this.collection = new mod();         
            that = this;
            this.collection.fetch({
            success : function(collection, response) {
            that.render(response);
            },
            error : function(collection, response) {
            console.log(response.statusText);
            },
  // A timeout is the only way to get an error event for JSONP calls!
  timeout : 5000
});

        },
            events:{
        "click #search" :"fetchModel"
    },
    fetchModel:function(){
        var lat = $('#lat').val();
        var long = $('#long').val();
        this.collection.fetch();
        console.log(this.collection)
    },
        render: function (models) {
            that = this
            if(models) {
                this.template = this.my_template;
                var input = this.collection.toJSON();
                var html=_.template(microTemplate,input);
                this.$el.append(html);
                return this;            
            } else {
            this.template = this.my_template;
            $(this.el).html(this.template);
           }

        }    
    });

    return showStoresView;
});

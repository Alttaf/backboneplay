define([
    'underscore',
    'backbone',
    'jquery',
    'text!templates/modules/showStores.html',
    // 'text!templates/modules/showStoresTable.html', does not work not sure why?
    'collections/showStoresCollection',
    'models/showStoresModel'
], function(_, Backbone, $, template, /*rowTempl,*/ mod) {
   var microTemplate="<table class='table table-bordered'><thead><tr><th>storeName</th><th>telephoneNumber</th><th>address1</th><th>address2</th><th>address3</th></tr></thead><tbody><% _.each(obj, function(index) { %> <tr><td class='name'><%= index.storeName %></td><td class='age'><%= index.telephoneNumber %></td><td class='age'><%= index.address1 %></td><td class='age'><%= index.address2 %></td><td class='age'><%= index.address3 %></td></tr><% }); %></tbody></table>";
    var showStoresView = Backbone.View.extend({
        el: '.content',
        table:'#table',
       // rowTemplate:_.template(rowTempl,{}),
        lat : 51.511,
        longs: 0.1198,
        my_template:_.template(template,{}),
        initialize : function() {
         this.collection = new mod([],{lat:this.lat, longs:this.longs});
         //this.collection.on('modelChange', this.render, this);
         //this.delegateEvents();
         //_.bindAll(this,'render');

        },
            events:{
        "click #search" :"fetchModel"
    },
    fetchModel:function(){
         var lat = $('#lat').val();
         var longs = $('#long').val();

        this.collection.lat = lat;
        this.collection.longs = longs;
        //this.collection.on('add', this.add, this);                    
        that = this;
        //this.collection.fetch();
        this.collection.fetch({
        success : function(collection, response) {
        that.render(response);
         //that.trigger("modelChange");
        return this;
        },
        error : function(collection, response) {
        console.log(response.statusText);
        },
       // reset:true,
         // add: true,
        // A timeout is the only way to get an error event for JSONP calls!
        timeout : 500
        });
        // console.log(this.collection.url);
        // console.log(this.collection.urlRoot);
    },
        render: function (models) {
            that = this
            if(models) {
                if(models.error) {
                    this.$el.append("<span>"+models.error+"</span>")
                    return this;
                }
                this.template = this.my_template;
                var input = this.collection.toJSON();
                var html=_.template(microTemplate,input);
                $('.table').remove();
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

define([
  '../core'
], function(base) {
  /**
   * @params
   * el, templateId, defaults
   */
  base.Backbone = function(params) {
    this.option = $.extend({}, params);
    this.init();
  };

  $.extend(base.Backbone.prototype, {
    init: function() {
      this.createModel();
      this.createView();
    },

    createModel: function() {
      var Model = Backbone.Model.extend({
        defaults: this.option.defaults || {}
      });

      this.model = new Model();
      return this.model;
    },

    createView: function() {
      var View = Backbone.View.extend({
        el: this.option.el,
        tagName: this.option.tagName,
        className: this.option.className,
        template: _.template($('#' + this.option.templateId).html()),
        initialize: function() {
          _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here

          this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
          this.$el.html(this.template(this.model.toJSON()));
          return this; // for chainable calls, like .render().el
        }
      });

      this.view = new View({
        model: this.model
      });

      return this.view;
    },

    set: function(obj) {
      this.model.set(obj);
    }
  });

});

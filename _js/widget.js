define(['jquery'], function($) {
    function Widget() {
        this.boundingBox = null; //属性 ：最外层容器  

    }
    Widget.prototype = {
        on: function(type, handler) {
            if(typeof this.handlers[type] == "undefined") {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire: function(type, data) {
            if(this.handlers[type] instanceof Array) {
                var handlers = this.handlers[type]
                for(var i = 0; i < handlers.length; i++) {
                    handlers[i](data);
                }
            }
            return this;
        },
        render: function(container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        renderUI: function() {

        },
        bindUI: function() {

        },
        syncUI: function() {

        },
        destructor: function() {},
        destroy: function() {
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        }

    }

    return {
        Widget: Widget
    }
})
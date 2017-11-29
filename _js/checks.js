define(['widget', 'jquery'], function(widget, $) {
    function Mcheck(el, opts) {
        this.cfg = {}
        this.parms = $.extend({}, this.cfg, opts)
        this.input = $(el)
        this.render();
    }

    Mcheck.prototype = $.extend({}, new widget.Widget(), {
        renderUI: function() {
            this.input.each(function() {
                $(this).wrap('<div class="mcheck-' + $(this).attr('type') + '"></div>')
            })
        },
        bindUI: function() {
            var _this = this
            this.input.each(function() {
                var input = $(this)
                var label = $(this).parent().siblings('label');

                input.parent().hover(function() {
                    $(this).addClass('hover');
                }, function() {
                    $(this).removeClass('hover');
                })
                label.hover(function() {
                    $(this).siblings().addClass('hover');
                }, function() {
                    $(this).siblings().removeClass('hover');
                })
                //绑定自定义事件，触发它，绑定点击，焦点，模糊事件              
                input.on('updateState', function() {
                        input.is(':checked') ? label.siblings().addClass('checked') : label.siblings().removeClass('checked checkedHover checkedFocus');
                    })
                    .trigger('updateState')
                    .click(function() {
                        $('input[name=' + $(this).attr('name') + ']').trigger('updateState');
                    })
                    .focus(function() {
                        label.siblings().addClass('focus');
                        if(input.is(':checked')) {
                            $(this).addClass('checkedFocus');
                        }
                    })
                    .blur(function() {
                        label.siblings().removeClass('focus checkedFocus');
                    });
            })

        }

    })

    return {
        Mcheck: Mcheck
    }
})
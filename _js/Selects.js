define(['widget', 'jquery'], function(widget, $) {
    function SelectList(el, opts) {
        // body...
        this.cfg = {

        }
        this.params = $.extend({}, this.cfg, opts)
        this.selects = $(el)
        this.render()

    }

    SelectList.prototype = $.extend({}, new widget.Widget(), {
        renderUI: function() {
            this.formbox = $('<div class="select_box"><div class="select_showbox"></div><ul class="select_option"></ul></div>')
            this.formbox.insertBefore(this.selects);
            this.createOptions(this.formbox.find('.select_option'))
        },
        createOptions: function(obj) {
            var options = this.selects.find('option'),
                selected_option = options.filter(":selected"),
                selected_index = selected_option.index(),
                showbox = obj.prev();
            showbox.text(selected_option.text());
            console.log(options.length)
            options.each(function(i) {
                var tag_option = $('<li></li>'),
                    txt_option = options.eq(i).text();
                tag_option.text(txt_option).appendTo(obj);
                if(i == selected_index) {
                    tag_option.attr('class', 'selected')
                }
            })
        },
        bindUI: function() {
            var _this = this
            this.formbox.on('click', function() {
                $('.select_option').slideToggle(150)
            })
            this.formbox.on('click', '.select_option li', function() {
                $(this).addClass('selected').siblings().removeClass('selected');
                _this.formbox.find('.select_showbox').text($(this).text())
            })
            this.formbox.find('.select_option li').hover(function() {
                $(this).addClass('hover').siblings().removeClass('hover');
            }, function() {
                $(this).removeClass('hover')
            })

        }
    })
    return {
        SelectList: SelectList
    }

})
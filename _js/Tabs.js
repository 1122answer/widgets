define(['widget', 'jquery'], function(widget, $) {
    function Tabs(el, opts) {
        this.cfg = {
            contentCls: 'content',
            navCls: 'nav',
            prevBtnCls: 'prev',
            nextBtnCls: 'next',
            activeCls: 'active',
            effect: 'fade',
            triggerType: 'mouse',
            triggerCondition: '*',
            activeIndex: '0',
            auto: false,
            delay: 1000,
            afterEvent: null,
            beforeEvent: null
        }
        this.params = $.extend({}, this.cfg, opts)
        this.container = $(el)
        this.content = $(el).find('.' + this.params.contentCls);
        this.prev = $(el).find('.' + this.params.prevBtnCls);
        this.next = $(el).find('.' + this.params.nextBtnCls);
        this.panels = this.content.children();
        this.triggers = $(el).find('.' + this.params.navCls + '>' + this.params.triggerCondition);
        this._size = this.panels.length;
        this._index = this.params.activeIndex;
        this.triggerType = this.params.triggerType;
        this._hander = null;
        this.params.triggerType += this.params.triggerType === "mouse" ? "enter" : "";
        this.onOff = false;
        this.render();
    }

    Tabs.prototype = $.extend({}, new widget.Widget(), {
        renderUI: function() {

        },
        toPrev: function() {
            var _this = this;
            var i = _this._index ? _this._index - 1 : _this._size - 1;
            this.setIndex(i)
        },
        toNext: function() {
            var _this = this;
            var i = (_this._index + 1) % _this._size;
            this.setIndex(i)
        },
        stop: function() {
            var _this = this;
            clearInterval(_this._hander)
        },
        start: function() {
            var _this = this;
            _this: stop();
            _this._hander = setInterval(function() {
                _this.toNext();

            }, _this.params.delay)
        },
        setIndex: function(index) {
        
            var _this = this;
            var panels = this.panels;
            var triggers = this.triggers;
            var effect = this.params.effect;
            switch(effect) {
                case 'fade':

                    if(_this.onOff) _this.fire('beforeEvent')
                    triggers.eq(index).addClass('active').siblings().removeClass('active')
                    panels.eq(index).css({
                        'z-index': 1
                    }).siblings().css({
                        'z-index': 0
                    })
                    panels.eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
                    _this._index = index;
                    if(_this.onOff) _this.fire('afterEvent') 
                    break;
                default:
                   if(_this.onOff) _this.fire('beforeEvent') 
                    triggers.eq(index).addClass('active').siblings().removeClass('active')
                    panels.eq(index).show().siblings().hide();
                    _this._index = index;
                    if(_this.onOff) _this.fire('afterEvent')  
            }

        },
        bindUI: function() {
            var _this = this;
            var triggers = this.triggers;
            if(this.params.afterEvent) {
                this.on('afterEvent', this.params.afterEvent)
            }
            if(this.params.beforeEvent) {
                this.on('beforeEvent', this.params.beforeEvent)
            }
            triggers.each(function(i) {
                var index = i
                $(this).on(_this.params.triggerType, function() {
                    _this.setIndex(index);
                    /*_this.fire('after')*/
                })
            })
            if(_this.params.auto) {
                _this.container.on('mouseover', function() {
                    _this.stop();
                });
                _this.container.on('mouseout', function() {
                    _this.start();
                })
                _this.start()
            }
            if(this.prev) {
                this.prev.on('click', function() {
                    _this.toPrev()
                     
                });
            }
            if(this.next) {
                this.next.on('click', function() {
                    _this.toNext()
                    
                });
            }
        },
        syncUI: function() {
            var _this = this;
            if(this.params.effect == 'fade') {
                this.content.css({
                    'position': 'relative'
                })
                for(var i = 0; i < this.panels.length; i++) {
                    this.panels[i].style.position = "absolute"
                }
            }

            this.setIndex(this._index);
            _this.onOff = true
        }

    })

    return {
        tabs: Tabs
    }
})
define(['widget', 'jquery','jqueryUI'], function(widget, $,jUI) {
  function Window() {
    this.cfg = {
      width: 280,
      height: 200,
      content: '',
      handler: null,
      title: '系统消息',
      hasCloseBtn: false,
      hander4AlertBtn: null,
      handler4CloseBtn: null,
      skinClassName: null,
      text4AlertBtn: '',
      hasMask: true,
      isDraggable: true,
      dragHandle: null,
      text4ConfirmBtn: '确定',
      text4CancelBtn: '取消',
      handler4ConfirmBtn: null,
      handler4CancelBtn: null,
      type: 'none'
    }
  }

  Window.prototype = $.extend({}, new widget.Widget(), {
    renderUI: function() {
      var footerContent = "";
      switch(this.cfg.winType) {
        case 'alert':
          footerContent = '<input  type = "button" value="' + this.cfg.text4AlertBtn + '" class="btn btn-primary window_alertBtn">';
          break;
        case 'confirm':
          footerContent = '<input  type = "button" value="' + this.cfg.text4ConfirmBtn + '" class="btn btn-primary window_confirmBtn"><input type = "button" value="' + this.cfg.text4CancelBtn + '" class="btn btn-primary window_cancelBtn">';
          break;
      }
      this.boundingBox = $('<div class="window_boundingBox">' +
        '<div class="window_body">' + this.cfg.content + '</div>' +
        '</div>');
      if(this.cfg.winType != "common") {
        this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>')
        this.boundingBox.append('<div class="window_footer">' + footerContent + '</div>')
      }
      if(this.cfg.hasMask) {
        this._mask = $('<div class="window_mask"></div>');
        this._mask.appendTo("body");
      };
      if(this.cfg.hasCloseBtn) {
        var closeBtn = $('<span class="window_closeBtn">X</span>');
        closeBtn.appendTo(this.boundingBox);
      this.boundingBox.appendTo("body");
      };
    },
    bindUI: function() {
      var that = this;
      if(this.cfg.handler4AlertBtn) {
        this.on('alet', this.cfg.handler4AlertBtn);
      }
      if(this.cfg.handler4CloseBtn) {
        this.on('close', this.cfg.handler4CloseBtn);
      }
      this.boundingBox.on('click', '.window_alertBtn', function() {
        that.fire('alet');
        that.destroy();
      }).on('click', '.window_closeBtn', function() {
        that.fire('close');
        that.destroy();
      }).on("click", ".window_confirmBtn", function() {
        that.fire('confirm');
        that.destroy();
      }).on("click", '.window_cancelBtn', function() {
        that.fire("cancel");
        that.destroy();
      })

      if(this.cfg.closeTime) {
        var timer = setTimeout(function() {
          that.destroy();
        }, this.cfg.closeTime)
      }
    },
    syncUI: function() {
      this.boundingBox.css({
        width: this.cfg.width + "px",
        height: this.cfg.height + 'px',

        left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
        top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
      });

      if(this.cfg.skinClassName) {
        this.boundingBox.addClass(this.cfg.skinClassName)
      }
      if (this.cfg.isDraggable) {
           if (this.cfg.dragHandle) {
              this.boundingBox.draggable({handle:this.cfg.dragHandle})
           }else{
              this.boundingBox.draggable()
           }
      }
      if(this.cfg.type != 'none') {
        this.boundingBox.find('.window_body').prepend('<div class="BeAlert_image"></div>')
        this.boundingBox.find('.BeAlert_image').addClass(this.cfg.type);
      }

    },
    destructor: function() {
      this._mask && this._mask.remove();
    },
    alert: function(cfg) {
      $.extend(this.cfg, cfg, {
        winType: 'alert'
      });
      this.render();
      return this;
    },
    confirm: function(cfg) {
      $.extend(this.cfg, cfg, {
        winType: 'confirm'
      });
      this.render();
      return this;
    },
    common: function(cfg) {
      $.extend(this.cfg, cfg, {
        winType: 'common'
      });
      this.render();
      return this;
    }
  })

  /*    var Window = new Window();*/
  return {
    Window: Window
  }
})
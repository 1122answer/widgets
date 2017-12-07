define(['jquery' ,'widget'], function($, widget) {
	function DataCheck(el ,opts) {
		this.cfg = {
			initEvent:"input",
			plugName:'dc'
		}
		this.rules = {
			"regexp" : function (data){
				return new RegExp(data).test(this.val())
			},
			"required" : function (data){
				return this.val();
			},
			"min-length" : function (data){
				return this.val().length>=data
			},
			"confirm": function (data){
				var passEle = $(':password')[0];
				if (passEle.value != "" && this.val()==passEle.value) {
					return true
				}else {
					return false
				}
			}
		};
		this.container = $(el)
		this.params = $.extend({}, this.cfg, opts);
		this.find = $(el).find('input');
		this.render();
	}

	DataCheck.prototype = $.extend({}, new widget.Widget(),{
		bindUI: function() {
			var that  = this

			this.find.on(this.params.initEvent, function() {
				var _this = $(this);
				
				_this.siblings('p').remove();
				$.each(that.rules,function(key,fn) {
					var $fileName = _this.data(that.params.plugName+"-"+key);
					var $message = _this.data(that.params.plugName+"-"+key + "-message")
					if ($fileName) {
						var result = fn.call(_this , $fileName);
						if (!result) {

						    _this.after("<p>"+ $message + "</p>")
						}
					}
				})
			})
		}
	})

	return {
		DataCheck : DataCheck
	}
})
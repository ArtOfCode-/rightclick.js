function context() {
	var _this = this;
	
	var getScript = function(path) {
		var s = document.createElement("script");
		var h = document.getElementsByTagName("head")[0];
		s.src = path;
		h.appendChild(s);
	}
	
	this.currentTarget = "";
	$(document).on("contextmenu",function() {
		$(".menu-wrapper").remove();
	});
	this.defaults = {
		appendViewSource: false,
		base64Lib: "base64lib.js"
	};
	if(_this.defaults.appendViewSource == true) {
		getScript(_this.defaults.base64Lib);
	}
	this.config = function(options) {
		for(var key in options) {
			(function(key) {
				_this.defaults[key] = options[key];
			})(key);
		}
		if(_this.defaults.appendViewSource == true) {
			getScript(_this.defaults.base64Lib);
		}
	};
	this.menu = function(e, options) {
		if(!e.preventDefault) {
			throw new ReferenceError("Event parameter invalid");
		}
		e.preventDefault();
		if(!e.clientX || !e.clientY) {
			throw new ReferenceError("Event parameter invalid");
		}
		var x = e.clientX;
		var y = e.clientY;
		var id = Math.floor(Math.random() * 8192);
		id = "menu-"+id;
		var menu = "<div class='menu-wrapper'></div>";
		menu = $(menu);
		menu.attr("id",id);
		var i = 0;
		for(var key in options) {
			(function(key) {
				var option = $("<span class='menu-item' id='menu-item-"+i+"'>"+key+"</span>");
				var fn = options[key];
				option.appendTo(menu);
				option.on("click",function() {
					fn();
				});
			})(key);
			i++;
		}
		if(_this.defaults.appendViewSource == true) {
			var option = $("<span class='menu-item' id='menu-item-"+i+"'>View Source</span>");
			option.on("click",function() {
				$(this).parent().remove();
				var doc = document.documentElement.outerHTML;
				var data = Base64.encode(doc);
				location.href = "data:text/plain;base64,"+data;
			});
			option.appendTo(menu);
		}
		menu.appendTo("body").hide();
		menu.css({
			top: y,
			left: x
		});
		menu.slideDown(150);
		$(document).click(function() {
			$("#"+id).remove();
		});
		$("#"+id).click(function(e) {
			e.stopPropagation();
		});
	};
	this.create = function() {
		var id = Math.floor(Math.random()*8192);
		id = "menu-"+id;
		var menu = "<div class='menu-wrapper'></div>";
		menu = $(menu);
		menu.attr("id",id);
		return menu;
	};
	this.addItem = function(menuObj,name,handler) {
		var id = Math.floor(Math.random()*65536);
		id = "menu-item-"+id;
		var option = $("<span class='menu-item' id='"+id+"'>"+name+"</span>");
		option.on("click",function(e) {
			handler.call();
		});
		menuObj.append(option);
		return menuObj;
	};		
	this.show = function(menuObj,top,left) {
		if(!top) top = 0;
		if(!left) left = 0;
		if(!menuObj) throw new SyntaxError("Menu object invalid.");
		var i = Math.floor(Math.random()*65536);
		if(_this.defaults.appendViewSource == true) {
			var option = $("<span class='menu-item' id='menu-item-"+i+"'>View Source</span>");
			option.on("click",function() {
				$(this).parent().remove();
				var doc = document.documentElement.outerHTML;
				var data = Base64.encode(doc);
				location.href = "data:text/plain;base64,"+data;
			});
			option.appendTo(menuObj);
		}
		menuObj
			.appendTo("body")
			.hide()
			.css({
				top: top,
				left: left
			})
			.show();
		$(document).on("click",function() {
			menuObj.remove();
		});
		menuObj.click(function(e) {
			e.stopPropagation();
		});
	};
}
window.context = new context();
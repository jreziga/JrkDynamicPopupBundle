// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
            width = elem.css("width"),
            elem.remove();

        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });
}

jQuery.fn.extend({
	toggleText:function(a,b){
		if(this.html()==a){this.html(b)}
		else{this.html(a)}
	}
});


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


String.prototype.nextAsciiCharacter = function() {
	return String.fromCharCode(this.toString().charCodeAt(0) + 1);
}

String.prototype.previousAsciiCharacter = function() {
	return String.fromCharCode(this.toString().charCodeAt(0) - 1);
}

String.prototype.leftPad = function (n){
    var out = '' + this.toString(); while (out.length < n) { out = '0' + out; } return out;
}

String.prototype.leftUnpad = function (){
    var str = this.toString(); var i = 0; for (i;i<str.length;i++) {  if (str.charAt(i) != '0')  break; } return str.substr(i,str.length);
}

var isset = function (obj){
	return obj !== undefined && obj !== null;
}

if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

var trace = function (title,message){
	modalInformation({title:title,message:message,closeLabel:'Fermer'},{minWidth:320});
}

// 1 or 0 Ammo for temp ajax loader
var AJAX_LOADER_SLINGSHOT_READY = false;
var AJAX_LOADER_IS_ACTIVE = false;
var TOGGLE_AJAX_LOADER = function() { AJAX_LOADER_IS_ACTIVE = !AJAX_LOADER_IS_ACTIVE; }
var RELOAD_SLINGSHOT_AJAX_LOADER = function() {AJAX_LOADER_SLINGSHOT_READY = true; ENABLE_AJAX_LOADER();}
var DEFUSE_SLINGSHOT_AJAX_LOADER = function() {AJAX_LOADER_SLINGSHOT_READY = false; DISABLE_AJAX_LOADER();}
var DISABLE_AJAX_LOADER = function() { AJAX_LOADER_IS_ACTIVE = false; }
var ENABLE_AJAX_LOADER = function() { AJAX_LOADER_IS_ACTIVE = true; }



jQuery.fn.serializeArrayNeutral = function(){
	var indexed = [];
	this.each(function(i, el){
		elem = jQuery(el);
		indexed.push({value:elem.val(),name:elem.attr('name')});
	});
	return indexed;
};

jQuery(function(){
	$('a.scroll-to[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});

	$("input[numeric]").each(function(){
		$(this).keyup(function(e){
			this.value = this.value.replace(/[^0-9]/g,'');
		});
	});
});
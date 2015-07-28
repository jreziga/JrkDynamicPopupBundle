
var modalTrigger = $("#general_modal_trigger");
var modalSkeleton = $("#skeleton_modal");

var view_default = {
	buttonClass:'btn btn-danger',
	marginTop:20,
	marginBottom:20,
	fontSize:12,
	color:'#434a54',
	headerClass:'bg-yellow-1',
	modalClass:'modal-custom'
};

if (modalSkeleton.length <=0) {
	throw new Error('JrkDynamicPopupBundle > Popup template doesn\'t exists, please use the \'dynamic_popup_template()\' twig function after body tag');
}

var popupTemplate = doT.template(modalSkeleton.html());

jQuery(function() {
	modalTrigger.fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		padding	: 0,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		afterLoad: function () {
			$(".fancybox-overlay").addClass("modal-custom");
			$(".fancybox-inner").addClass("h-auto");
		}
	});
});

function modalRender(output,opts) {
	if (!isset(opts)) {
		opts = {};
	}
	if (!isset(opts.maxWidth)) {
		opts.maxWidth = 500;
	}

	if (!isset(opts.minWidth)) {
		opts.minWidth = 320;
	}

	opts['content'] = output;
	$.fancybox.open(opts);
}

function modalInformation(baseView,opts) {
	var view = jQuery.extend({}, baseView);
	view.multiple = false;

	$.each(view_default,function(index,val){
		if (!isset(view[index])) {
			view[index] = val;
		}
	});

	if (isset(view.dataMessage)) {
		var messageTemplate = doT.template(view.message);
		view.message = messageTemplate(view.dataMessage);
	}

	if (isset(view.dataTitle)) {
		var messageTemplate = doT.template(view.title);
		view.title = messageTemplate(view.dataTitle);
	}

	var output = popupTemplate(view).replace(/__onclick__/g,'onclick');
	//var output = Mustache.render(modalSkeleton.html(), view).replace(/__onclick__/g,'onclick');

	modalRender(output,opts);
}

function modalChoices(baseView,opts,$this) {
	var view = jQuery.extend({}, baseView);
	view.multiple = true;
	$.each(view_default,function(index,val){
		if (!isset(view[index])) {
			view[index] = val;
		}
	});

	if (isset(view.dataMessage)) {
		var messageTemplate = doT.template(view.message);
		view.message = messageTemplate(view.dataMessage);
	}

	if (isset(view.dataTitle)) {
		var messageTemplate = doT.template(view.title);
		view.title = messageTemplate(view.dataTitle);
	}

	if (isset(view.choices)) {
		for(var i=0;i<view.choices.length;i++) {
			if (!isset(view.choices[i].buttonClass)) {
				view.choices[i].buttonClass = 'btn btn-primary';
			}
		}
	}

	var output = popupTemplate(view).replace(/__onclick__/g,'onclick');
	//var output = Mustache.compile(modalSkeleton.html(), view).replace(/__onclick__/g,'onclick');

	if (isset($this)) {
		var uniqueId = $this.uniqueId();
		output = output.replace(/__this__/g,"$('#"+uniqueId.attr('id')+"')");
	}

	modalRender(output,opts);
}


function getModalFieldElement() {
	return $('.popbox-form-field:visible');
}
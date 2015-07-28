jQuery(function($){

	$(document).ajaxStart(function(){
		if (AJAX_LOADER_IS_ACTIVE) {
			$.fancybox.close();
			$('#wrapper-loader').show();
			checkSlingshotState();
		}
	});

	$(document).ajaxComplete(function(){
		$('#wrapper-loader').hide();
	});

	$(document).ajaxError(function(){
		$('#wrapper-loader').hide();
	});



});

function checkSlingshotState() {
	if (AJAX_LOADER_SLINGSHOT_READY) {
		DEFUSE_SLINGSHOT_AJAX_LOADER();
	}
}

function rawError(data) {
	alert('An error occured, go to console');
	console.log(data);
	return false;
}
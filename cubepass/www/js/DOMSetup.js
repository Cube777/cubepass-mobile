$(document).ready(function(){
	var $a = $("a");

	$a.click(function(x) {
		x.preventDefault();
		var url = $(this).attr('href');
		window.open(url);
	});

	if (!app.isCordova){
		console.log('Manualy starting deviceReady');
		app.deviceReady();
	}
});

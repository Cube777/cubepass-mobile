$(document).ready(function(){
	var theme = window.localStorage.getItem('theme');
	if (theme == null) {
		window.localStorage.setItem('theme', 'dark');
		theme = "dark";
	}
	if (theme == "light") {
		$('link[href="css/ratchet.mod.css"]').attr('href', 'css/ratchet.min.css');
	}

	app.divrender = $('#render');
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

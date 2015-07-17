$(document).ready(function(){
	var theme = window.localStorage.getItem('theme');
	if (theme == null) {
		window.localStorage.setItem('theme', 'light');
		theme = "light";
	}
	if (theme == "dark") {
		$('link[href="css/ratchet.min.css"]').attr('href', 'css/ratchet.mod.css');
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

	document.addEventListener('backbutton', function() {
		app.saveData();
		navigator.app.exitApp();
	}, false);

	document.addEventListener('pause', app.logout, false);
	setTimeout(app.deviceReady, 1000);
});

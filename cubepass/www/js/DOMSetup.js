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

	document.addEventListener('backbutton', function() {
		app.saveData();
		navigator.app.exitApp();
	}, false);

	document.addEventListener('pause', function() {
		app.saveData();
		app.userPassword = "";
		var i;
		for (i = 0; i < app.entities.length; i++) {
			app.entities.user_data[i] = undefined;
		}
		app.render('src/login.html');
	}, false);
});

$(document).ready(domReady);

function domReady()
{
	var $a = $("a");

	$a.click(function(x) {
		x.preventDefault();
		var url = $(this).attr('href');
		window.open(url);
	});

	if (!app.isCordova)
		app.deviceReady();
};

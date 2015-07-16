// warning, jQuery code below
$(document).ready(function() {
                         
	var $a = $("a");

	$a.click(function(x) {
		x.preventDefault();
	        var url = $(this).attr('href');
		launchUrl(url); // where launchUrl is your function that calls window.open, etc
	});	
	
});
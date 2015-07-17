$(document).ready(function() {
  $('.warning').fadeOut(0);
});

function login(){
  var psswd = window.localStorage.getItem('user-password');
  var attempt = $('#password').val();

  if (strDecrypt(psswd, attempt) != attempt) {
    $('#btnLogin').removeClass("btn-positive").addClass("btn-negative").html("Decrypting...");
    $('#password').attr("disabled", "true");
    setTimeout(reset, 3000);
    return;
  }

  app.userPassword = attempt;
  app.render('src/home.html')
};

function reset() {
  $('#password').val('').removeAttr('disabled');
  $('#btnLogin').removeClass("btn-negative").addClass("btn-positive").html("Login");
  $('.warning').fadeIn();
}

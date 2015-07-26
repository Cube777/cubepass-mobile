$(document).ready(function() {
  $('.warning').fadeOut(0);
  $('#login-logo').css("height", $('#login-logo').css("width"));
});

function login(){
  var attempt = $('#password').val();
  if (attempt === "") {
    return false;
  }

  var psswd = window.localStorage.getItem('user-password');
  if (strDecrypt(psswd, attempt) != attempt) {
    $('#btnLogin').removeClass("btn-positive").addClass("btn-negative").html("Decrypting...");
    $('#password').attr("disabled", "true");
    setTimeout(reset, 3000);
    return false;
  }

  app.userPassword = attempt;
  app.loginSafe = true;
  app.loadData();
  app.render('src/home.html');
  return false;
};

function reset() {
  $('#password').val('').removeAttr('disabled');
  $('#btnLogin').removeClass("btn-negative").addClass("btn-positive").html("Login");
  $('.warning').fadeIn();
}

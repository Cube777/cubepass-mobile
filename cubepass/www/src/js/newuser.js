$(document).ready(function() {
  $('.warning').fadeOut(0);
});

function createUser() {
  var psswd = $('#password');
  var cpsswd = $('#cpassword');
  if (psswd.val() != cpsswd.val()) {
    $('.warning').fadeIn();
    return;
  }
  window.localStorage.setItem('user-password', strEncrypt(psswd.val(), psswd.val()));
  window.localStorage.setItem('user-data', '{"user_data" : []}');
  app.divrender.load('src/login.html');
};

$(document).ready(function() {
  $('.warning').fadeOut(0);
  $('.btn').fadeOut(0);

  $('.req').keyup(function() {
    var test = ($('#password').val() == "");
    test = ($('#cpassword').val() == "") || test;

    if (test) {
      $('.btn').fadeOut();
    } else {
      $('.btn').fadeIn();
    }
  })
});

function createUser() {
  var psswd = $('#password');
  var cpsswd = $('#cpassword');
  if (psswd.val() != cpsswd.val()) {
    $('.warning').fadeIn();
    return false;
  }
  window.localStorage.setItem('user-password', strEncrypt(psswd.val(), psswd.val()));
  window.localStorage.setItem('user-data', '{"user_data" : []}');
  app.divrender.load('src/login.html');
  return false;
};

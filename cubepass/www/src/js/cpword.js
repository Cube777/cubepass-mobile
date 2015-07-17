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
})

function change_pword() {
  var psswd = $('#password');
  var cpsswd = $('#cpassword');
  if (psswd.val() != cpsswd.val()) {
    $('.warning').fadeIn();
    return false;
  }

  app.userPassword = cpsswd.val();
  window.localStorage.setItem('user-password', strEncrypt(cpsswd.val(), cpsswd.val()));
  app.saveData();
  app.render('src/options.html');
  return false;
}

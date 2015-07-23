function unsafeLogin() {
  if ($('#password').val() == "") {
    return;
  }
  app.loginSafe = false;
  app.userPassword = $('#password').val();
  app.loadData();
  app.render('src/home.html');
}

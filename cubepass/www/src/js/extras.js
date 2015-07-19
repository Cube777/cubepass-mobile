function unsafeLogin() {
  app.loginSafe = false;
  app.userPassword = $('#password').val();
  app.loadData();
  app.render('src/home.html');
}

$(document).ready(function() {
  $('#memo').val(app.memoData);
});

function save_memo() {
  app.memoData = $('#memo').val();
  app.saveData();
  app.render('src/options.html');
}
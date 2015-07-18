$(document).ready(function() {
  $('#question').text('Are you sure you want to delete "' + app.currentItem + '"?');
});

function trash_it() {
  var arrNum;
  for (arrNum = 0; app.items[arrNum].iname != app.currentItem; arrNum++);

  app.items.splice(arrNum, 1);
  app.saveData();
  app.render('src/home.html');
}

$(document).ready(function() {
  console.log('New item init');
  $('.icon-check').fadeOut(0);
  $('.icon-check').click(createItem);
  $('.warning').fadeOut(0);
});

$('.req').keyup(function() {
  var temp = ($('#item-name').val() === "");
  temp = (($('#username').val() === "") || temp);
  temp = (($('#password').val() === "") || temp);

  if (!temp) {
    $('.icon-check').fadeIn();
  }
  else {
    $('.icon-check').fadeOut();
  }
});

function createItem() {
  console.log("Create item called");

  var i;
  var name = $('#item-name');
  for (i = 0; i < app.items.length; i++) {
    if (app.items[i].entName === name.val()) {
      used = true;
      $('.warning').fadeIn();
      return;
    }
  }
  app.items.push(new app.item($('#item-name').val(), $('#username').val(), $('#password').val(), $('#notes').val()));
  console.log(app.items);

  if ($('#notes').val() === "") {
    delete app.items[app.items.length - 1].notes;
  }

  app.saveData();
  app.render('src/home.html');
}

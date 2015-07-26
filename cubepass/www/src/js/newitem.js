var pwordShowing = false;
var nItem = {
  name : null,
  username : null,
  password : null,
  notes : null,
  iCheck : null
};

$(document).ready(function() {
  nItem.name = $('#item-name');
  nItem.username = $('#username');
  nItem.password = $('#password');
  nItem.notes = $('#notes');
  nItem.iCheck = $('.icon-check');

  nItem.iCheck.fadeOut(0);
  $('.warning').fadeOut(0);
});

$('.req').keyup(function() {
  var temp = (nItem.name.val() === "");
  temp = ((nItem.username.val() === "") || temp);
  temp = ((nItem.password.val() === "") || temp);

  if (!temp) {
    nItem.iCheck.fadeIn();
  }
  else {
    nItem.iCheck.fadeOut();
  }
});

function createItem() {
  var i;
  for (i = 0; i < app.items.length; i++) {
    if (app.items[i].iname === nItem.name.val()) {
      $('.warning').fadeIn();
      return;
    }
  }
  app.items.push(new app.item(nItem.name.val(), nItem.username.val(), nItem.password.val(), nItem.notes.val()));

  if (nItem.notes.val() === "") {
    delete app.items[app.items.length - 1].notes;
  }
  console.log('Creating new item "' + nItem.name.val() + '"');
  app.saveData();
  app.render('src/home.html');
}

function togglePword() {
  if (!pwordShowing) {
    $('#password').attr('type', 'text');
    $('#tPword').removeClass('btn-outlined');
  } else {
    $('#password').attr('type', 'password');
    $('#tPword').addClass('btn-outlined');
  }
  pwordShowing = !pwordShowing;
}

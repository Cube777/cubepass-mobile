var pwordShowing = false;
var editing = false;
var arrNum = -1;
var details = {
  username : null,
  password : null,
  notes : null
};


$(document).ready(function() {
  $('.title').text("Details - " + app.currentItem);
  for (arrNum = 0; app.items[arrNum].iname != app.currentItem; arrNum++);
  details.username = $('#username');
  details.password = $('#password');
  details.notes = $('#notes');

  details.username.val(app.items[arrNum].username);
  details.password.val(app.items[arrNum].password);
  if (app.items[arrNum].notes != undefined) {
    details.notes.val(app.items[arrNum].notes);
  }

  $('.warning').fadeOut(0);
});

$('.req').keyup(function() {
  var test = (details.username.val() == "");
  test = test || (details.password.val() == "");

  if (test) {
    $('.icon-check').fadeOut();
  } else {
    $('.icon-check').fadeIn();
  }
})

function togglePword() {
  if (pwordShowing) {
    $('#btnShow').addClass('btn-outlined');
    details.password.attr('type', 'password');
  } else {
    $('#btnShow').removeClass('btn-outlined');
    details.password.attr('type', 'text');
  }
  pwordShowing = !pwordShowing;
}

function toggleEdit() {
  if (!editing) {
    $('.dataf').removeAttr('readonly');
    $('.icon').fadeOut(200, function() {
      $('.icon-left-nav').removeClass('icon-left-nav').addClass('icon-trash').attr('onclick', 'trash_this()');
      $('.icon-edit').removeClass('icon-edit').addClass('icon-check').attr('onclick', 'save_this()');
    });
    details.username.focus();
    $('.icon').fadeIn(200);
  } else {
    $('.dataf').attr('readonly', '');
    $('.icon').fadeOut(200, function() {
      $('.icon-trash').removeClass('icon-trash').addClass('icon-left-nav').attr('onclick', 'app.render("src/home.html")');
      $('.icon-check').removeClass('icon-check').addClass('icon-edit').attr('onclick', 'toggleEdit()');
    });
    $('.icon').fadeIn(200);
  }
  editing = !editing;
}

function trash_this() {
  app.render('src/deleteitem.html');
}

function save_this() {
  app.items[arrNum].username = details.username.val();
  app.items[arrNum].password = details.password.val();
  delete app.items[arrNum].notes;
  if (details.notes.val() != "") {
    app.items[arrNum].notes = details.notes.val();
  }
  app.saveData();
  toggleEdit();
}

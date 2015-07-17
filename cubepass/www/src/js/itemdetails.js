var pwordShowing = false;
var editing = false;
var arrNum = -1;

$(document).ready(function() {
  $('.title').text("Details - " + app.currentItem);
  for (arrNum = 0; app.items[arrNum].entName != app.currentItem; arrNum++);

  $('#username').val(app.items[arrNum].username);
  $('#password').val(app.items[arrNum].password);
  if (app.items[arrNum].notes != undefined) {
    $('#notes').val(app.items[arrNum].notes);
  }

  $('.warning').fadeOut(0);
});

$('.req').keyup(function() {
  var test = ($('#username').val() == "");
  test = test || ($('#password').val() == "");

  if (test) {
    $('.icon-check').fadeOut();
  } else {
    $('.icon-check').fadeIn();
  }
})

function togglePword() {
  if (pwordShowing) {
    $('#btnShow').addClass('btn-outlined');
    $('#password').attr('type', 'password');
  } else {
    $('#btnShow').removeClass('btn-outlined');
    $('#password').attr('type', 'text');
  }
  pwordShowing = !pwordShowing;
}

function toggleEdit() {
  if (!editing) {
    $('.dataf').removeAttr('readonly');
    $('.icon').fadeOut(400, function() {
      $('.icon-left-nav').removeClass('icon-left-nav').addClass('icon-trash').attr('onclick', 'trash_this()');
      $('.icon-edit').removeClass('icon-edit').addClass('icon-check').attr('onclick', 'save_this()');
    });
    $('#username').focus();
    $('.icon').fadeIn();
  } else {
    $('.dataf').attr('readonly', '');
    $('.icon').fadeOut(400, function() {
      $('.icon-trash').removeClass('icon-trash').addClass('icon-left-nav').attr('onclick', 'app.render("src/home.html")');
      $('.icon-check').removeClass('icon-check').addClass('icon-edit').attr('onclick', 'toggleEdit()');
    });
    $('.icon').fadeIn();
  }
  editing = !editing;
}

function trash_this() {
  app.render('src/deleteitem.html');
}

function save_this() {
  app.items[arrNum].username = $('#username').val();
  app.items[arrNum].password = $('#password').val();
  delete app.items[arrNum].notes;
  if ($('#notes').val() != "") {
    app.items[arrNum].notes = $('#notes').val();
  }
  app.saveData();
  toggleEdit();
}

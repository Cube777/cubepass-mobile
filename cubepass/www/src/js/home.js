$(document).ready(function() {
  if (!app.homeCompiled) {
    console.log("Compiling home");
    var source = $('#item-tpl').html();
    app.homeTpl = Handlebars.compile(source);
    app.homeCompiled = true;
  }

  app.updateHome();

  var html = "";
  for (i = 0; i < app.items.length; i++) {
    html += app.homeTpl({item : app.homeItems[i]});
  }
  if (html === "") {
    html = "<p> It seems as though you don't have any items!" +
    " Create your first one by tapping the create button in the top-right corner" +
    "</p>";
    $(".act-content").html(html).fadeOut(0).fadeIn();
  } else {
    $('#item-list').html(html);
  }

  $('#srch').keyup(function() {
    app.homeSrchQ = $('#srch').val();
    app.updateHome();

    var html = "";
    for (i = 0; i < app.homeItems.length; i++) {
      html += app.homeTpl({item : app.homeItems[i]});
    }

    if (html == "") {
      html = '<p> No items found for search "' + app.homeSrchQ + '"</p>';
      $('.act-content').html(html);
    } else {
      $('.act-content').html('<div id="item-list">' + html + '</div>');
    }
  });
});

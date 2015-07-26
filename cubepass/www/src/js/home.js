var home = {
  srch : "",
  actContent : ""
}

$(document).ready(function() {
  if (!app.homeCompiled) {
    console.log("Compiling home");
    var source = $('#item-tpl').html();
    app.homeTpl = Handlebars.compile(source);
    app.homeCompiled = true;
  }
  home.srch = $('#srch');
  home.actContent = $('#act-content');
  home.srch.keyup(update);

  update();
});

function update() {
  home.actContent.stop(true, true);
  app.homeSrchQ = home.srch.val();
  app.updateHome();

  var html = "";
  for (i = 0; i < app.homeItems.length; i++) {
    html += app.homeTpl({item : app.homeItems[i]});
  }

  if (html == "") {
    if (app.homeSrchQ == "") {
      html = "<p> It seems as though you don't have any items!" +
      " Create your first one by tapping the create button in the top-right corner" +
      "</p>";
    } else {
      html = '<p> No items found for search "' + app.homeSrchQ + '"</p>';
    }
  }

  home.actContent.html(html);
}

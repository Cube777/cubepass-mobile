$(document).ready(function() {
  app.items.sort();
  var source = $('#item-tpl').html();
  var template = Handlebars.compile(source);

  var html = "";
  for (i = 0; i < app.items.length; i++) {
    html += template({item : app.items[i].entName});
  }
  if (html === "") {
    html = "<p> It seems as though you don't have any items!" +
    " Create your first on by tapping the create button in the top-right corner" +
    "</p>";
    $(".content").html(html).fadeOut(0).fadeIn();
  } else {
    $('#item-list').html(html);
  }
});

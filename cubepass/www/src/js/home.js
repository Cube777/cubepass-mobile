$(document).ready(function() {
  app.entities = JSON.parse(window.localStorage.getItem('user-data'));
  
  var i;
  for (i = 0; i < app.entities.user_data.length; i++) {
    app.entities.user_data[i].entName = strDecrypt(app.entities.user_data[i].entName, app.userPassword);
    app.entities.user_data[i].username = strDecrypt(app.entities.user_data[i].username, app.userPassword);
    app.entities.user_data[i].password = strDecrypt(app.entities.user_data[i].password, app.userPassword);
    app.entities.user_data[i].notes = strDecrypt(app.entities.user_data[i].notes, app.userPassword);
  }

  var source = $('#entity-tpl').html();
  var template = Handlebars.compile(source);

  var html = "";
  for (i = 0; i < app.entities.user_data.length; i++) {
    html += template({entity : app.entities.user_data[i].entName});
  }
  $('#entity-list').html(html);
});

$(document).ready(function() {
  if (window.localStorage.getItem('theme') == "light") {
    $("#btnTheme").html("Switch to dark theme");
  }
});

function switch_theme(){
  if (window.localStorage.getItem('theme') == "light") {
    $('link[href="css/ratchet.min.css"]').attr('href', 'css/ratchet.mod.css');
    window.localStorage.setItem('theme', 'dark');
    $("#btnTheme").html("Switch to light theme");
  } else {
    $('link[href="css/ratchet.mod.css"]').attr('href', 'css/ratchet.min.css');
    window.localStorage.setItem('theme', 'light');
    $("#btnTheme").html("Switch to dark theme");
  }
}

$(document).ready(function() {
  $('input').val(window.localStorage.getItem('user-password'));
  $('textarea').val(window.localStorage.getItem('user-data'));
})

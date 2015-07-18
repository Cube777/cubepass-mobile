function encrypt() {
  $('#output').val(strEncrypt($('#input').val(), $('#keyword').val()));
}

function decrypt() {
  $('#output').val(strDecrypt($('#input').val(), $('#keyword').val()));
}

function copy() {
  $('#input').val($('#output').val());
  $('#output').val("");
}

function strEncrypt(plaintext, keyword) {
  if ((plaintext == "") || (keyword == "")) {
    return "";
  }

  var shifts = HashString(keyword);
  var strBlocks = [];
  var temp;
  var i;
  for (i = 0; i < plaintext.length; i++) {
    temp = "";
    while ((i < plaintext.length) && (temp.length <= keyword.length)) {
      temp += plaintext[i];
      i++;
    }
    strBlocks.push(temp);
  }

  var currKeyword = keyword;
  var ciphertext = [];

  for (i = 0; i < strBlocks.length; i++) {
    var tempShift = HashString(currKeyword);
    temp = ShiftForward(strBlocks[i], tempShift);

    ciphertext.push(temp);
    currKeyword = ShiftForward(temp, shifts);
  }

  temp = "";
  for (i = 0; i < ciphertext.length; i++) {
    temp += ciphertext[i];
  }

  var trailChars = TrailingChars(shifts);
  for (i = 0; i < trailChars; i++) {
    temp += String.fromCharCode((Math.round(Math.random() * 100) % 95) + 32);
  }

  return temp;
}

function strDecrypt(ciphertext, keyword) {
  return ciphertext;
}

function HashString(str) {
  var shifts = [];

  var total = 0;
  var i;
  for (i = 0; i < str.length; i++) {
    if (i % 2 == 0) {
      total += str.charCodeAt(i);
    } else {
      total += str.charCodeAt(i) * 2;
    }
  }

  for (i = 0; i < str.length; i++) {
    shifts[i] = Math.floor(total / str.charCodeAt(i)) + (total % str.charCodeAt(i));
  }

  return shifts;
}

function ShiftForward(str, shifts) {
  var ascii;
  var temp = "";
  var i;

  for (i = 0; i < str.length; i++) {
    ascii = str.charCodeAt(i) + shifts[i];

    while (ascii > 126) {
      ascii -= 95;
    }

    temp += String.fromCharCode(ascii);
  }

  return temp;
}

function TrailingChars(shifts) {
  var total = 0;
  var i;

  for (i = 0; i < shifts.length; i++) {
    total += shifts[i];
  }

  return total % 25;
}

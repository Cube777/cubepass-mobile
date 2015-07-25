function strEncrypt(plaintext, keyword) {
  //Return empty string if plaintext or keyword is empty
  if ((plaintext == "") || (keyword == "")) {
    return "";
  }

  //Calculate keyword shifts
  var shifts = HashString(keyword);
  //Will hold blocks of the plaintext
  var strBlocks = [];
  var temp;

  //Break up the plaintext string into blocks the size of the keyword
  var i = 0;
  while (i < plaintext.length) {
    temp = "";
    while ((i < plaintext.length) && (temp.length < keyword.length)) {
      temp += plaintext.charAt(i);
      i++;
    }
    strBlocks.push(temp);
  }

  //Will hold the current keyword (first will be the main keyword,
  //the rest will be the keyword calculated from the previous block)
  var currKeyword = keyword;
  //Will hold the blocks of ciphertext
  var ciphertext = [];

  //First hash the current keyword, then shift the current
  //string block forward with the calculated shifts.
  //Then calculate the next keyword by shifting forward the new
  //encrypted block of text. Copy the new string block into
  //the ciphertext array.
  for (i = 0; i < strBlocks.length; i++) {
    var tempShift = HashString(currKeyword);
    temp = ShiftForward(strBlocks[i], tempShift);

    ciphertext.push(temp);
    currKeyword = ShiftForward(temp, shifts);
  }

  //Concatenate the ciphertext array into one string
  temp = "";
  for (i = 0; i < ciphertext.length; i++) {
    temp += ciphertext[i];
  }

  //Calculate the amount of trailing chars
  //and append it to the string
  var trailChars = TrailingChars(shifts);
  for (i = 0; i < trailChars; i++) {
    temp += String.fromCharCode((Math.round(Math.random() * 100) % 95) + 32);
  }

  return temp;
}

function strDecrypt(ciphertext, keyword) {
  if ((ciphertext == "") || (keyword == "")){
    return "";
  }

  var shifts = HashString(keyword);
  var trailChars = TrailingChars(shifts);
  var i;

  for (i = 0; i < trailChars; i++) {
    if (ciphertext == "") {
      return "";
    }

    ciphertext = ciphertext.slice(0, -1);
  }

  var strBlocks = [];
  var temp;
  i = 0;
  while (i < ciphertext.length) {
    temp = "";
    while ((i < ciphertext.length) && (temp.length < keyword.length)) {
      temp += ciphertext.charAt(i);
      i++;
    }
    strBlocks.push(temp);
  }

  var currKeyword = keyword;
  var plaintext = [];
  var tempShift;

  for (i = 0; i < strBlocks.length; i++) {
    tempShift = HashString(currKeyword);
    temp = ShiftBack(strBlocks[i], tempShift);
    plaintext.push(temp);

    currKeyword = ShiftForward(strBlocks[i], shifts);
  }

  temp = "";

  for (i = 0; i < plaintext.length; i++) {
    temp += plaintext[i];
  }

  return temp;
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

function ShiftBack(str, shifts) {
  var ascii;
  var temp = "";
  var i;

  for (i = 0; i < str.length; i++) {
    ascii = str.charCodeAt(i) - shifts[i];

    while (ascii < 32) {
      ascii += 95;
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

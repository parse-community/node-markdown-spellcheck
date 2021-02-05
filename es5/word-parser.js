"use strict";

exports.__esModule = true;

exports.default = function (tokens) {
  var wordList = [];
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    var text = token.text;
    var index = token.index;
    while (true) {
      // eslint-disable-line no-constant-condition
      var nextWord = text.match(/(\w+(\.\w+)+\.?)|[\u00c0-\u01bf\u01d0-\u029f\w'\u2018-\u2019][\-#\u00c0-\u01bf\u01d0-\u029f\w'\u2018-\u2019]*|[\u0400-\u04FF\w'\u2018-\u2019][\-#\u0400-\u04FF\w'\u2018-\u2019]*/);
      if (!nextWord) {
        break;
      }
      var word = nextWord[0];
      var thisWordIndex = index + nextWord.index;

      var badStart = word.match(/^[#'\u2018]+/);
      if (badStart) {
        var badStartLength = badStart[0].length;
        thisWordIndex += badStartLength;
        word = word.substr(badStartLength, word.length - badStartLength);
      }
      var badEndings = word.match(/['\u2019\-#]+$/);
      if (badEndings) {
        word = word.substr(0, word.length - badEndings[0].length);
      }
      word = word.split('.').join(' ')
      var wordTwo = word.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
      var wordSplit = wordTwo.split(' ')
      for (var x=0;x<wordSplit.length;x++) {      
        var split = wordSplit[x];
        if (split === '') {
          continue;
        }
        wordList.push({ word: split, index: thisWordIndex + word.indexOf(split) });
      }

      index += nextWord.index + nextWord[0].length;
      text = text.slice(nextWord.index + nextWord[0].length);
    }
  }
  return wordList;
};
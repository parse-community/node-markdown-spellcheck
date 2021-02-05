export default function(tokens) {
  const wordList = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let text = token.text;
    let index = token.index;
    while (true) { // eslint-disable-line no-constant-condition
      const nextWord = text.match(/(\w+(\.\w+)+\.?)|[\u00c0-\u01bf\u01d0-\u029f\w'\u2018-\u2019][\-#\u00c0-\u01bf\u01d0-\u029f\w'\u2018-\u2019]*|[\u0400-\u04FF\w'\u2018-\u2019][\-#\u0400-\u04FF\w'\u2018-\u2019]*/);
      if (!nextWord) {
        break;
      }
      let word = nextWord[0];
      let thisWordIndex = index + nextWord.index;

      const badStart = word.match(/^[#'\u2018]+/);
      if (badStart) {
        const badStartLength = badStart[0].length;
        thisWordIndex += badStartLength;
        word = word.substr(badStartLength, word.length - badStartLength);
      }
      const badEndings = word.match(/['\u2019\-#]+$/);
      if (badEndings) {
        word = word.substr(0, word.length - badEndings[0].length);
      }
      word = word.split('.').join(' ')
      const wordTwo = word.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
      for (const split of wordTwo.split(' ')) {      
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
}

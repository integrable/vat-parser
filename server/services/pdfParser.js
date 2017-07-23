const PDFParser = require("pdf2json");

exports.extractVatNumbersFromFile = (file) => {
  let pdfParser = new PDFParser(this, 1);

  return new Promise((resolve, reject) => {

    pdfParser.on("pdfParser_dataError", errData => {
      reject(new Error('Parsing problem'));
    });
    pdfParser.on("pdfParser_dataReady", pdfData => {
      resolve(findVatNumbers(pdfParser.getRawTextContent()));
    });

    pdfParser.parseBuffer(file.data);
  });

};

const codePattern = /\s(fr|ie|gb|eu)(\s|[0-9])/ig; // TODO: missing country code
const windowSize = 25;
const countryPatterns = {
  'fr': /fr\d{11}/i,
  'gb': /gb\d{9}/i,
  'ie': /ie\d{7}[a-z]{1}/i,
  'eu': /eu\d{9}/i,
}

function findVatNumbers(str) {
  const res = [];
  let match;
  while (match = codePattern.exec(str)) {
    const code = match[0].trim().toLocaleLowerCase().substr(0, 2);
    const windowToCheck = str.substr(match.index, windowSize).replace(/\s/gi, '');

    const matched = windowToCheck.match(countryPatterns[code]); //TODO: check that VAT is not too long (probably we cut it)
    if (matched && res.indexOf(matched[0]) == -1) {
      res.push(matched[0].toUpperCase());
    }
  }

  return res;

}

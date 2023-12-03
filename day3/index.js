import { _input } from "./input.js";

const input = _input.split("\n");
const numRegex = /(\d*)/gm;
const symbolRegex = /(\*|\/|@|#|\$|\%|\^|&|-|\+|=)/gm;

let numbers = [];
let symbols = [];

let isAdjacent = (range, symbol) => {
  return range[0] <= symbol && symbol <= range[1];
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let lineNumbers = [];
  let lineSymbols = [];
  const numMatches = [...line.matchAll(numRegex)].filter((x) => x[0] != "");
  const symbolMatches = [...line.matchAll(symbolRegex)];
  numMatches.forEach((match) => {
    lineNumbers.push({
      number: parseInt(match[0]),
      startIndex: match.index,
      endIndex: match.index + match[0].length - 1,
      neighbourRange: [match.index - 1, match.index + match[0].length],
    });
  });
  symbolMatches.forEach((match) => {
    lineSymbols.push({
      symbol: match[0],
      index: match.index,
    });
  });
  numbers.push(lineNumbers);
  symbols.push(lineSymbols);
}

let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  numbers[i].forEach((num) => {
    const symbolsUpper = symbols[i - 1];
    const symbolsCurrent = symbols[i];
    const symbolsBelow = symbols[i + 1];
    if (symbolsUpper && symbolsUpper.length > 0) {
      symbolsUpper.forEach((sym) => {
        if (isAdjacent(num.neighbourRange, sym.index))
          // console.log(num, sym);
          sum += num.number;
      });
    }
    if (symbolsCurrent && symbolsCurrent.length > 0) {
      symbolsCurrent.forEach((sym) => {
        if (isAdjacent(num.neighbourRange, sym.index)) {
          // console.log(num, sym);
          sum += num.number;
        }
      });
    }
    if (symbolsBelow && symbolsBelow.length > 0) {
      symbolsBelow.forEach((sym) => {
        if (isAdjacent(num.neighbourRange, sym.index))
          //  console.log(num, sym);
          sum += num.number;
      });
    }
  });
}
console.log(sum);

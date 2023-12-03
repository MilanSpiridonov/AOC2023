import { _input } from "./input.js";

const input = _input.split("\n");
const numRegex = /(\d*)/gm;
const gearRegex = /(\*)/gm;
let numbers = [];
let symbols = [];
let sum = 0;

let isAdjacent = (range, symbol) => {
  return range[0] <= symbol && symbol <= range[1];
};

for (let i = 0; i < input.length; i++) {
  const line = input[i];
  let lineNumbers = [];
  let lineSymbols = [];
  const numMatches = [...line.matchAll(numRegex)].filter((x) => x[0] != "");
  const symbolMatches = [...line.matchAll(gearRegex)];
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

for (let i = 0; i < numbers.length; i++) {
  symbols[i].forEach((symbol) => {
    const numbersUpper = numbers[i - 1];
    const numbersCurrent = numbers[i];
    const numbersBelow = numbers[i + 1];
    const adjacent = [];

    if (numbersUpper && numbersUpper.length > 0) {
      numbersUpper.forEach((num) => {
        if (isAdjacent(num.neighbourRange, symbol.index)) adjacent.push(num);
      });
    }
    if (numbersCurrent && numbersCurrent.length > 0) {
      numbersCurrent.forEach((num) => {
        if (isAdjacent(num.neighbourRange, symbol.index)) adjacent.push(num);
      });
    }
    if (numbersBelow && numbersBelow.length > 0) {
      numbersBelow.forEach((num) => {
        if (isAdjacent(num.neighbourRange, symbol.index)) adjacent.push(num);
      });
    }
    if (adjacent.length === 2) {
      sum += parseInt(adjacent[0].number) * parseInt(adjacent[1].number);
    }
  });
}
console.log(sum);

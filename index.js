import { _input } from "./input.js";

const regexRawNums = /(\d)/gm;
const regexWordNums = /(one|two|three|four|five|six|seven|eight|nine)/gm;
const numbers = [
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
];
let sum = 0;

function getNum(num) {
  return numbers.filter((x) => x[0] === num)[0][1];
}

let input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

input = _input.split("\n");

input.forEach((line) => {
  let firstNum = 0;
  let lastNum = 0;
  let charBuffer = "";
  for (let i = 0; i < line.length; i++) {
    let _num = line.charAt(i);
    if (!isNaN(_num)) {
      firstNum = _num;
      break;
    } else {
      charBuffer = `${charBuffer}${_num}`;
      if (regexWordNums.test(charBuffer)) {
        let temp = charBuffer.replaceAll(regexWordNums, getNum);
        let _temp = [...temp.matchAll(regexRawNums)].filter(
          (x) => x[0] !== ""
        )[0][0];
        firstNum = parseInt(_temp);
        break;
      }
    }
  }
  charBuffer = "";
  for (let i = line.length - 1; i >= 0; i--) {
    let _num = line.charAt(i);
    if (!isNaN(_num)) {
      lastNum = _num;
      break;
    } else {
      charBuffer = `${_num}${charBuffer}`;
      if (regexWordNums.test(charBuffer)) {
        let temp = charBuffer.replaceAll(regexWordNums, getNum);
        let _temp = [...temp.matchAll(regexRawNums)].filter(
          (x) => x[0] !== ""
        )[0][0];
        lastNum = parseInt(_temp);
        break;
      }
    }
  }
  charBuffer = "";
  const number = parseInt(`${firstNum}${lastNum}`);
  sum += number;
  console.log(number);
});
console.log(sum);

//54558

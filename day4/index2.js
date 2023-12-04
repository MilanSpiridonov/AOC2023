import { _input } from "./input.js";

const numberRegex = /\d+/gm;
const points = [];
const input = _input.split("\n");
for (let i = 0; i < input.length; i++) {
  let matches = 0;
  const line = input[i];
  const numbers = line.split(":")[1];
  const _winning = numbers.split("|")[0];
  const _present = numbers.split("|")[1];
  const winning = _winning.match(numberRegex).map((numStr) => parseInt(numStr));
  const present = _present.match(numberRegex).map((numStr) => parseInt(numStr));
  present.forEach((num) => {
    if (winning.includes(num)) matches++;
  });
  points.push(matches);
}
const cards = points.map((x) => 1);

for (let i = 0; i < cards.length; i++) {
  for (let n = i + 1; n <= i + points[i]; n++) {
    cards[n] += cards[i];
  }
}

console.log(cards.reduce((acc, v) => acc + v, 0));

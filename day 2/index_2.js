import { _input } from "./input.js";

const regexGame = /(Game \d*)/gm;
const regexCubes = /(\d*) (blue|red|green)/gm;

const bagLimit = {
  red: 12,
  green: 13,
  blue: 14,
};

const parsePair = (str) => {
  return {
    color: str.split(" ")[1],
    count: parseInt(str.split(" ")[0]),
  };
};

let powers = [];

_input.split("\n").forEach((line) => {
  let maxCubes = { red: 0, green: 0, blue: 0 };
  let powerOfMinSet = 0;
  const game = parseInt(line.match(regexGame)[0].split(" ")[1]);
  const cubes = line.match(regexCubes);

  cubes.forEach((element) => {
    const cubePair = parsePair(element);
    if (maxCubes[cubePair.color] < cubePair.count)
      maxCubes[cubePair.color] = cubePair.count;
  });
  powerOfMinSet = maxCubes.blue * maxCubes.green * maxCubes.red;
  powers.push(powerOfMinSet);
});
const sum = powers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(sum);

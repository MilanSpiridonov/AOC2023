import { _input } from "./input.js";

const regexRawNums = /(\d)/gm;
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
    count: str.split(" ")[0],
  };
};
let sum = 0;
_input.split("\n").forEach((line) => {
  let availableCubes = { ...bagLimit };
  console.log(line);
  const game = parseInt(line.match(regexGame)[0].split(" ")[1]);
  const cubes = line.match(regexCubes);
  let lineIsFine = true;

  cubes.forEach((element) => {
    const cubePair = parsePair(element);
    console.log(
      availableCubes[cubePair.color],
      cubePair.count,
      availableCubes[cubePair.color] < cubePair.count
    );
    if (availableCubes[cubePair.color] < cubePair.count) lineIsFine = false;
  });
  if (lineIsFine) sum += game;
});
console.log(sum);

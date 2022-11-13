// random value between min (inclusive) and max (exclusive)
const range = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

// random value between min (inclusive) and max (exclusive), then floored
const rangeFloor = (min, max) => Math.floor(range(min, max));

// pick a random element in the given array
const pickRandom = (array) =>
  array.length ? array[rangeFloor(array.length)] : undefined;

export default pickRandom;
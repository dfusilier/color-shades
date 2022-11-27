const getHueName = hue => {
  if (Number.isNaN(hue)) {
    return "neutral";
  } 
  const name = hueRanges.find(hueRange => 
    hueRange.min <= hue && hue <= hueRange.max
  ).name;

  return name === "black" || name === "white" 
    ? "neutral"
    : name;
};

const hueRanges = [
  { min: 0,   max: 11,  name: "red" },
  { min: 11,  max: 40,  name: "orange" },
  { min: 40,  max: 77,  name: "yellow" },
  { min: 77,  max: 167, name: "green" },
  { min: 167, max: 248, name: "blue" },
  { min: 248, max: 280, name: "purple" },
  { min: 280, max: 335, name: "pink" },
  { min: 335, max: 360, name: "red" }
];

export default getHueName;

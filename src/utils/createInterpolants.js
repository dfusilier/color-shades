import Color from 'colorjs.io';
import { createInterpolant } from "./createInterpolant";

const lerp = (min, max, t) => min * (1 - t) + max * t;

const createInterpolants = (color, hStart, hEnd, sStart, sEnd) => {
  color = color.to("hsl");

  let [hBase, sBase, lBase] = color.coords;

  // Grayscale colors have no hue and return NaN
  // when converted to HSL.
  if (Number.isNaN(hBase)) {
    
    if (hStart && hEnd) {
      hBase = lerp(hStart, hEnd, lBase / 100);
    } else if (hStart) {
      hBase = hStart
    } else if (hEnd) {
      hBase = hEnd 
    } else {
      hBase = 0;
    }
  }

  // Note that "== null" will return true for both undefined and null.
  // If changing this, remember to be careful of 0 evaluating to false.
  if(hStart == null) { hStart = hBase };
  if(hEnd == null) { hEnd = hBase };
  if(sStart == null) { sStart = sBase };
  if(sEnd == null) { sEnd = sBase };

  const hArray = [hStart, hBase, hEnd];
  const sArray = [sStart, sBase, sEnd];
  const lArray = [0, lBase, 100];
  const intH = createInterpolant(lArray, hArray);
  const intS = createInterpolant(lArray, sArray);
  const intColor = (l) => [intH(l), intS(l), l];

  const setLightness = (l) => {
    return new Color({ space: "hsl", coords: intColor(l) });
  }

  const changeLightness = (shade, changePercent) => {
    if (!shade) {
      throw Error("A shade of the original color must be passed to this interpolant function.")
    }
    const shadeLightness = shade.hsl().object().l;
    const positiveRange = 100 - shadeLightness;
    const negativeRange = shadeLightness;
    const decimalPercent = changePercent / 100;
    const lightnessChange = decimalPercent >= 0 ? (positiveRange * decimalPercent) : (negativeRange * decimalPercent);
    const resultLightness = shadeLightness + lightnessChange;
    return Color.hsl(intColor(resultLightness));
  }

  return {
    setLightness,
    changeLightness,
    darken: (shade, change) => changeLightness(shade, -change),
    lighten: (shade, change) => changeLightness(shade, change)
  };
}

export default createInterpolants;
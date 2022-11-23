// Use a color's contrast with black to
// generate a numerical shade on a scale
// from 0 (black) to 200 (white).

// When used in color names, the difference 
// between two numerical shades can be used
// to quickly assess color contrast:

// * 4.5 contrast: Difference of 100 
// * 3.0 contrast: Difference of 75

const shadeFromContrast = contrast => 
  Math.log(contrast) / Math.log(21) * 200;

export default shadeFromContrast;

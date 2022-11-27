
const toCssColor = (colorObj, p3 = false) => {
  let color = colorObj.to("srgb");

  // Clip is no 
  if (!p3) {
    return color.toString({ format: "hex" });
  }

  // If color is out of sRGB gamut, may convert to P3 in future.
  if(!color.inGamut()) {
    return color.to("p3").toString();
  } else {
    return color.toString({ format: "hex" });
  }
}

export default toCssColor;
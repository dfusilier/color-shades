import Color from "color";

const white = new Color("white");

const suggestTextColor = colorStr => {
    const color = new Color(colorStr);
    return color.contrast(white, "WCAG21") >= 4.5 ? "white" : "black";
}
    
export default suggestTextColor;

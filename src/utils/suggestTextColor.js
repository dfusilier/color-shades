import Color from 'colorjs.io';

const white = new Color("white");

const suggestTextColor = colorStr => {
    const color = new Color(colorStr);
    return color.contrastWCAG21(white, "WCAG21") >= 4.5 ? "white" : "black";
}
    
export default suggestTextColor;


const formatHex = str => {
  if(str.length === 4) {
    return (
      str[0] +
      str[1] +
      str[1] +
      str[2] +
      str[2] +
      str[3] +
      str[3] 
    );
  } else {
    return str;
  }
};

export default formatHex;
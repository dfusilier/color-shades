import Color from "color";
import suggestColor from "./suggestColor";

const black = Color("black");

// Suggests various shades of a single color.

// Ideally, would also work with other predicates
// like DeltaE or hue manipulations but would need
// to accept a domain to determine range of increments.
// Decided a function that works specifically
// for accessible contrats was fine for now.

const shadeFromContrast = ({
  manipulation,
  targets,
  increments = 5,
  tolerance
}) => {

  const domainMin = 1;
  const domainMax = 21;
  const predicate = result => black?.contrast(result);

  // If targets are provided, use them. If
  // not, use the number of increments to
  // determined evenly distributed targets.

  let finalTargets = [];

  if (targets && targets.length > 0) {
    finalTargets = targets;
  } else {
    const ratio = Math.pow(domainMax, (domainMin / increments));
    for(let i = 1; i <= increments - 1; i++) {
      finalTargets.push(Math.pow(ratio, i));
    }
  }

  return finalTargets.map(target => {
    if(target === 1) { return Color("black"); }
    if(target === 21) { return Color("white"); }
    return suggestColor({
      manipulation,
      predicate,
      target,
      tolerance,
      targetIsMin: false
    });
  });
};

export default shadeFromContrast;
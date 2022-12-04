import React from 'react';
import useQueryParams from './utils/useQueryParams';
import styled from "styled-components";
import Color from 'colorjs.io';

// Utils
import toCssColor from './utils/toCssColor';
import { omit } from 'lodash';

// Components
import Box from './components/Box';
import ColorCoordInput from './components/ColorCoordInput';

const ColorCoordForm = ({ color, coordType }) => {
  let [queryParams, setQueryParams, setThrottledQueryParams] = useQueryParams();
  color = color.to("hsl");

  // Notes: 
  // – Null, "", 0, and "3" are all considered numbers.
  // - Undefined and NaN are not considered numbers.
  // – Grayscale colors will have a hBase that is NaN.

  // Variable notes:
  // – "base" is the value used for calculation. 
  // – "Values" are what display in fields. 

  const h = getHslCoordData("h", color, queryParams);
  const s = getHslCoordData("s", color, queryParams);
  const coord = coordType === "h" ? h : s;

  if (coordType === "s") {
    coord.base.trackBackground = makeCssGradient(
      new Color("hsl", [ h.base.calcValue, 0, 50 ]),
      new Color("hsl", [ h.base.calcValue, 100, 50 ])
    );
    coord.start.trackBackground = makeCssGradient(
      new Color("hsl", [ h.start.calcValue, 0, 50 ]),
      new Color("hsl", [ h.start.calcValue, 100, 50 ])
    );
    coord.end.trackBackground = makeCssGradient(
      new Color("hsl", [ h.end.calcValue, 0, 50 ]),
      new Color("hsl", [ h.end.calcValue, 100, 50 ])
    );
  } else {
    coord.base.trackBackground = hueTrackBackground;
    coord.start.trackBackground = hueTrackBackground;
    coord.end.trackBackground = hueTrackBackground;
  }

  const handleInputChange = (queryKey, value, throttle = false) => {
    const colorValue = toCssColor(color, true);
    const setQueryParamsFn = throttle 
      ? setThrottledQueryParams
      : setQueryParams;

    // If anything changes, add the current color value to 
    // the query params. This ensures a random color isn't applied
    // on reload.
    let newQueryParams = { ...queryParams, color: colorValue };
    
    // If non-base coord changes, things are simple.
    // Update the value.
    if(queryKey !== "hBase" && queryKey !== "sBase") {
      newQueryParams[queryKey] = value;
      return setQueryParams(newQueryParams);
    } 

    // Allow blank field
    if(value === "") {
      newQueryParams[queryKey] = value;
      return setQueryParams(newQueryParams);
    } 

    // Otherwise, things are a little more complicated.
    // Changing hBase or sBase will create a new color.
    const colorNewCoords = queryKey === "hBase" 
      ? [ Number(value), Number(s.base.calcValue), Number(color.hsl.l) ] 
      : [ Number(h.base.calcValue), Number(value), Number(color.hsl.l) ];
    const colorNew = new Color("hsl", colorNewCoords);

    // If the new color is in the HSL (same gamut as sRGB)...
    if (colorNew.inGamut()) {

      // ...then update to equivalent hex color value.
      const colorNewValue = toCssColor(colorNew, true);
      newQueryParams.color = colorNewValue;

      // Omit the old hBase and sBase values – but if different
      // hue and sat values are seen when converting the new color
      // value hex back into HSL, then apply new hue and sat values. 
      newQueryParams = omit(newQueryParams, ["hBase", "sBase"]);
      const colorFromNewHex = new Color(colorNewValue).to("hsl");
      if (Math.round(colorFromNewHex.hsl.h) !== colorNew.hsl.h) {
        newQueryParams.hBase = colorNew.hsl.h;
      }
      if (Math.round(colorFromNewHex.hsl.s) !== colorNew.hsl.s) {
        newQueryParams.sBase = colorNew.hsl.s;
      }

    // If the new color is out of gamut, the color value can't
    // be updated. Instead, just update hBase or sBase.
    } else {
      newQueryParams[queryKey] = value;
    }

    return setQueryParamsFn(newQueryParams);
  };
  
  return(
    <Box.GridColumn>
    
      <CustomBoxCell className="flex-column flex-justify-center">
        <ColorCoordInput
          label="↑ Dark end"
          value={coord.start.inputValue}
          placeholder={coord.base.inputValue}
          max={coord.max}
          minMaxField={false}
          subduedField={coord.start.inputValueIsFallback}
          trackBackground={coord.start.trackBackground}
          onFieldChange={value => handleInputChange(
            coord.start.queryKey,
            value
          )}
          onSliderChange={value => handleInputChange(
            coord.start.queryKey,
            value,
            true
          )}
        />
      </CustomBoxCell>

      <CustomBoxCell className="flex-column flex-justify-center flex-fill-y">
        <ColorCoordInput
          label="★ Base color"
          value={coord.base.inputValue}
          max={coord.max}
          minMaxField={true}
          subduedField={coord.base.inputValueIsFallback}
          trackBackground={coord.base.trackBackground}
          onFieldChange={value => handleInputChange(
            coord.base.queryKey,
            value
          )}
          onSliderChange={value => handleInputChange(
            coord.base.queryKey,
            value,
            true
          )}
        />
      </CustomBoxCell>

      <CustomBoxCell className="flex-column flex-justify-center flex-fill-y">
        <ColorCoordInput
          label="↓ Light end"
          value={coord.end.inputValue}
          placeholder={coord.base.inputValue}
          max={coord.max}
          minMaxField={false}
          subduedField={coord.end.inputValueIsFallback}
          trackBackground={coord.end.trackBackground}
          onFieldChange={value => handleInputChange(
            coord.end.queryKey,
            value
          )}
          onSliderChange={value => handleInputChange(
            coord.end.queryKey,
            value,
            true
          )}
        />
      </CustomBoxCell>

    </Box.GridColumn>
  );
}

const CustomBoxCell = styled(Box.Cell)`
  --box-padding-block: 1rem;
  --box-padding-inline: 1rem;
  padding-block-start: 0.75rem;
  @media (min-width: 768px) {
    --box-padding-block: 1.75rem;
    --box-padding-inline: 1.5rem;
    padding-block-start: 1.25rem;
  }
`
export default ColorCoordForm;

const makeCssGradient = (c1, c2, opts = { space: "hsl" }) => {
  const r = Color.range(c1, c2, opts);
  const stops = Color.steps(r, {steps: 5, maxDeltaE: 3});
  return `linear-gradient(to right, ${
    stops.join(", ")
  })`;
}

const hueTrackBackground = makeCssGradient(
  new Color("hsl", [ 0, 100, 50 ]), 
  new Color("hsl", [ 353, 100, 50 ]),
  { space: "hsl", hue: "longer" }
);

const hslData = {
  h: {
    name: "hue",
    min: 0,
    max: 360
  },
  s: {
    name: "saturation",
    min: 0,
    max: 100
  }
}

const getHslCoordData = (coordKey, color, queryParams) => {
  const { min, max, name } = hslData[coordKey];
  
  const base = {};
  base.queryKey = `${coordKey}Base`;
  base.queryValue = queryParams[base.queryKey];
  base.colorValue = Math.round(color.hsl[coordKey]);
  base.calcValue = base.queryValue || base.colorValue || min;
  base.inputValue = isNaN(base.queryValue) ? base.calcValue : base.queryValue;
  base.inputValueIsFallback = !base.queryValue && !base.colorValue;

  const start = {};
  start.queryKey = `${coordKey}Start`;
  start.queryValue = queryParams[start.queryKey];
  start.calcValue = start.queryValue || base.calcValue;
  start.inputValue = isNaN(start.queryValue) ? base.inputValue : start.queryValue;
  start.inputValueIsFallback = !start.queryValue;

  const end = {};
  end.queryKey = `${coordKey}End`;
  end.queryValue = queryParams[end.queryKey];
  end.calcValue = end.queryValue || base.calcValue;
  end.inputValue = isNaN(end.queryValue) ? base.inputValue : end.queryValue;
  end.inputValueIsFallback = !end.queryValue;

  return { name, min, max, start, base, end };
}
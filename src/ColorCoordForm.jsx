import React from 'react';
import useQueryParams from './utils/useQueryParams';
import styled from "styled-components";
import Color from 'colorjs.io';

// Components
import Box from './components/Box';
import FormGroup from './components/FormGroup';
import TextField from './components/TextField';
import Slider from './components/Slider';

const coordVars = {
  hue: {
    abbrev: "h",
    index: 0,
    min: 0,
    max: 354
  },
  saturation: {
    abbrev: "s",
    index: 1,
    min: 0,
    max: 100
  }
}

const ColorCoordForm = ({ color, coordType }) => {
  let [queryParams, setQueryParams, setThrottledQueryParams] = useQueryParams();
  const { abbrev, index } = coordVars[coordType];
  const coords = color.to("hsl").coords;

  const baseValue = handleValue(coords[index], {
    ifUndefined: 0, 
    ifNaN: 0,
  });
  const startKey = `${abbrev}Start`;

  const startValue = handleValue(queryParams[startKey], { 
    ifUndefined: baseValue, 
    ifNaN: 0 
  });

  const endKey = `${abbrev}End`;
  const endValue = handleValue(queryParams[endKey], { 
    ifUndefined: baseValue, 
    ifNaN: 0 
  });

  const baseColorHex = color.to("srgb").toString({ format: "hex"});
  
  let startTrackBackground, baseTrackBackground, endTrackBackground;
  
  if(coordType === "saturation") {
    
    startTrackBackground = makeCssGradient(
      new Color("hsl", [ queryParams.hStart || coords[0] || 0, 0, 50 ]),
      new Color("hsl", [ queryParams.hStart || coords[0] || 0, 100, 50 ])
    );
    baseTrackBackground = makeCssGradient(
      new Color("hsl", [ coords[0] || 0, 0, 50 ]),
      new Color("hsl", [ coords[0] || 0, 100, 50 ])
    );
    endTrackBackground = makeCssGradient(
      new Color("hsl", [ queryParams.hEnd || coords[0] || 0, 0, 50 ]),
      new Color("hsl", [ queryParams.hEnd || coords[0] || 0, 100, 50 ])
    );
  } else {
    startTrackBackground = hueTrackBackground;
    baseTrackBackground = hueTrackBackground;
    endTrackBackground = hueTrackBackground;
  }

  return(
    <Box.GridColumn>
    
      <CustomBoxCell className="flex-column flex-justify-center">
        <Input
          id={`${coordType}-start-input`}
          coordType={coordType}
          label="↑ Dark end"
          value={startValue}
          trackBackground={startTrackBackground}
          onFieldChange={value => 
            setQueryParams({
              ...queryParams,
              color: baseColorHex,
              [startKey]: value
            })
          }
          onSliderChange={value => 
            setThrottledQueryParams({
              ...queryParams,
              color: baseColorHex,
              [startKey]: value
            })
          }
        />
      </CustomBoxCell>

      <CustomBoxCell className="flex-column flex-justify-center flex-fill-y">
        <Input
          id={`${coordType}-base-input`}
          coordType={coordType}
          label="★ Base color"
          value={baseValue}
          trackBackground={baseTrackBackground}
          onFieldChange={value => setQueryParams({
            ...queryParams,
            color: color.set({ 
                [`hsl.${abbrev}`]: value
              })
              .to("srgb").toString({ format: "hex" })
          })}
          onSliderChange={value => setThrottledQueryParams({
            ...queryParams,
            color: color.set({ 
                [`hsl.${abbrev}`]: value
              })
              .to("srgb").toString({ format: "hex" })
          })}
        />
      </CustomBoxCell>

      <CustomBoxCell className="flex-column flex-justify-center flex-fill-y">
        <Input
          id={`${coordType}-end-input`}
          coordType={coordType}
          label="↓ Light end"
          value={endValue}
          trackBackground={endTrackBackground}
          onFieldChange={value => 
            setQueryParams({
              ...queryParams,
              color: baseColorHex,
              [endKey]: value
            })
          }
          onSliderChange={value => 
            setThrottledQueryParams({
              ...queryParams,
              color: baseColorHex,
              [endKey]: value
            })
          }
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

const Input = ({ 
  id,
  coordType, 
  label, 
  value, 
  onFieldChange,
  onSliderChange,
  trackBackground
}) => {
  const { min, max } = coordVars[coordType];
  
  return(
    <div className="flex-column gap-1">
      <FormGroup>
        <label htmlFor={id}>{label}</label>
        <TextField 
          className="type-size-0"
          id={id}
          name={id}
          type="number" 
          step="1"
          min={min}
          max={max}
          value={value}
          onChange={e => onFieldChange(e.target.value)}
        />
      </FormGroup>

      <Slider.Root 
        className="SliderRoot" 
        defaultValue={[value]} 
        min={min} 
        max={max} 
        step={1} 
        aria-label={label}
        onValueChange={value => onSliderChange(value)}
      >
        <Slider.Track className="SliderTrack" background={trackBackground}>
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" />
      </Slider.Root>
    </div>
  );
}

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
)

const handleValue = (value, { ifUndefined, ifNaN }) => {
  if (typeof value === "undefined") {
    return ifUndefined;
  } 
  if (Number.isNaN(value)) {
    return ifNaN;
  } 
  return Math.round(value);
}
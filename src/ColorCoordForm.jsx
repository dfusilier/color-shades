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
  let [queryParams, setQueryParams] = useQueryParams();
  const { abbrev, index } = coordVars[coordType];
  const coords = color.to("hsl").coords;

  const baseValue = Math.round(coords[index]);
  const startKey = `${abbrev}Start`;
  const startValue = queryParams[startKey] || baseValue;
  const endKey = `${abbrev}End`;
  const endValue = queryParams[endKey] || baseValue;
  const baseColorHex = color.to("srgb").toString({ format: "hex"});
  
  let trackBackground;
  
  if(coordType === "saturation") {
    
    trackBackground = makeCssGradient(
      new Color("hsl", [ coords[0], 0, coords[2] ]),
      new Color("hsl", [ coords[0], 100, coords[2] ])
    );
  } else {
    trackBackground = hueTrackBackground;
  }

  return(
    <Box.GridColumn>
    
      <CustomBoxCell className="flex-column flex-justify-center">
        <Input
          id={`${coordType}-start-input`}
          coordType={coordType}
          label="↑ Dark end"
          value={startValue}
          trackBackground={trackBackground}
          onChange={value => 
            setQueryParams({
              ...queryParams,
              [startKey]: value,
              color: baseColorHex
            })
          }
        />
      </CustomBoxCell>

      <CustomBoxCell className="flex-column flex-justify-center flex-fill-y">
        <Input
          id={`${coordType}-base-input`}
          coordType={coordType}
          label="★ Key color"
          value={baseValue}
          trackBackground={trackBackground}
          onChange={value => setQueryParams({
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
          trackBackground={trackBackground}
          onChange={value => 
            setQueryParams({
              ...queryParams,
              [endKey]: value,
              color: baseColorHex
            })
          }
        />
      </CustomBoxCell>

    </Box.GridColumn>
  );
}

const CustomBoxCell = styled(Box.Cell)`
  --box-padding-block: 16px;
  --box-padding-inline: 16px;
  padding-block-start: 12px;
  @media (min-width: 768px) {
    --box-padding-block: 16px;
    --box-padding-inline: 24px;
    padding-block-start: 8px;
  }
`

const Input = ({ 
  id,
  coordType, 
  label, 
  value, 
  onChange,
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
          onChange={e => onChange(e.target.value)}
        />
      </FormGroup>

      <Slider.Root 
        className="SliderRoot" 
        defaultValue={[value]} 
        min={min} 
        max={max} 
        step={1} 
        aria-label={label}
        onValueChange={value => onChange(value)}
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
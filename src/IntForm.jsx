import React from 'react';
// import styled from "styled-components";
// import Color from 'colorjs.io';

// Components
import Box from './components/Box';
import FormGroup from './components/FormGroup';
import TextField from './components/TextField';

// const abbrevsMap = {
//   "hue": "h",
//   "saturation": "s"
// };

const coordsMap = {
  "hue": 0,
  "saturation": 1
};

const IntForm = ({ color, colorProperty }) => {
  // const abbrev = abbrevsMap[colorProperty];
  const coord = coordsMap[colorProperty];
  const coords = color.to("hsl").coords;
  const v = Math.round(coords[coord]);
  return(
    <Box.GridColumn>
    
      <Box.Cell className="flex-column flex-justify-center">
        <FormGroup style={{ marginBlockEnd: "8px"}}>
          <label htmlFor={`${colorProperty}-start-input`}>↑ Start</label>
          <TextField 
            className="type-size-1"
            id={`${colorProperty}-start-input`}
            name={`${colorProperty}-start-input`}
            type="number" 
            value={v}
            onChange={e => {}}
          />
        </FormGroup>
      </Box.Cell>

      <Box.Cell className="flex-column flex-justify-center flex-fill-y">
        <FormGroup style={{ marginBlockEnd: "8px"}}>
          <label htmlFor={`${colorProperty}-end-input`}>★ Base</label>
          <TextField 
            className="type-size-1"
            id={`${colorProperty}-end-input`}
            name={`${colorProperty}-end-input`}
            type="number" 
            value={v}
            onChange={e => {}}
          />
        </FormGroup>
      </Box.Cell>

      <Box.Cell className="flex-column flex-justify-center flex-fill-y">
        <FormGroup style={{ marginBlockEnd: "8px"}}>
          <label htmlFor="hue-start-input">↓ End</label>
          <TextField 
            className="type-size-1"
            id="hue-start-input" 
            name="hue-start-input"
            type="number" 
            value={v}
            onChange={e => {}}
          />
        </FormGroup>
      </Box.Cell>

    </Box.GridColumn>
  );
}

export default IntForm;


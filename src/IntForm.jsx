import React from 'react';
// import styled from "styled-components";
// import Color from 'color';

// Components
import Box from './components/Box';
import FormGroup from './components/FormGroup';
import TextField from './components/TextField';

const abbreviations = {
  "hue": "h",
  "saturation": "s"
};

const IntForm = ({ color, colorProperty }) => {
  const abbrevColorProperty = abbreviations[colorProperty];
  
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
            value={Math.round(color.hsl().object()[abbrevColorProperty])}
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
            value={Math.round(color.hsl().object()[abbrevColorProperty])}
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
            value={Math.round(color.hsl().object()[abbrevColorProperty])}
            onChange={e => {}}
          />
        </FormGroup>
      </Box.Cell>

    </Box.GridColumn>
  );
}

export default IntForm;


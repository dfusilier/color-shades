import { useState, useEffect } from 'react';
import Color from 'colorjs.io';

import formatHex from '../utils/formatHex';
import toCssColor from '../utils/toCssColor';

import TextField from './TextField';
import ColorPicker from './ColorPicker'; 
import InputLabel from './InputLabel';
import InputError from './InputError';

const ColorInput = ({ 
  value, 
  className,
  onFieldChange, 
  onPickerChange,
  ...otherProps
}) => {

  let [ showErrors, setShowErrors ] = useState(false);

  let colorObj; 
  let invalid = false;
  let isTransparent = false;

  try {
    colorObj = new Color(value);
    isTransparent = colorObj.alpha !== 1;
    invalid = isTransparent;
  } catch {
    invalid = true;
  }

  const pickerValue = invalid 
    ? "#000000" 
    : formatHex(toCssColor(colorObj));

  // Show errors if they aren't corrected
  // after a set amount of time.
  useEffect(() => {
    setShowErrors(false);
    if(invalid) {
      setTimeout(() => setShowErrors(true), 3000);
    }
  }, [invalid, value]);

  return(
    <fieldset className={"stack-00 " + className} {...otherProps}>
      <legend>Color</legend>
      <div className="flex-row gap-1" style={{ alignItems: "end", marginBlockEnd: "8px"}}>
        <InputLabel>
          <span className='screen-reader-only'>Enter color</span>
          <TextField 
            block
            autocomplete="off"
            className="type-size-2"
            type="text" 
            value={value}
            aria-invalid={invalid}
            onChange={onFieldChange} 
          />
          { isTransparent && showErrors &&
            <InputError>Shades don't work with transparent colors.</InputError>
          }
          { invalid && !isTransparent && showErrors &&
            <InputError>Enter a valid CSS color.</InputError>
          }
        </InputLabel>
        
        <ColorPicker 
          aria-label="Edit color"
          value={pickerValue} 
          onChange={onPickerChange}
          bg={pickerValue} 
        />
      </div>
    </fieldset>
  )
}

export default ColorInput;
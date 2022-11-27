
import Color from 'colorjs.io';

import formatHex from '../utils/formatHex';

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

  let color; 
  let pickerValue = "#000000";
  let isTransparent = false;
  
  try {
    color = new Color(value);
    isTransparent = color.alpha !== 1;
    pickerValue = isTransparent 
      ? pickerValue 
      : formatHex(
        color.to("srgb").toString({ format: "hex" })
      );
  } catch {}

  const invalid = isTransparent;

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
          { isTransparent &&
            <InputError>Shades don't work with transparent colors.</InputError>
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
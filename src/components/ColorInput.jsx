
// Utils
import formatHex from '../utils/formatHex';

// Components
import TextField from './TextField';
import ColorPicker from './ColorPicker'; 
import InputLabel from './InputLabel';
import InputError from './InputError';

const ColorInput = ({ 
  value, 
  valuePicker,
  error,
  errorMessage,
  className,
  onFieldChange, 
  onPickerChange,
  ...otherProps
}) => {

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
            aria-invalid={error}
            onChange={onFieldChange} 
          />
          { error && errorMessage &&
            <InputError>{errorMessage}</InputError>
          }
        </InputLabel>
        
        <ColorPicker 
          aria-label="Edit color"
          value={formatHex(valuePicker || value)} 
          onChange={onPickerChange}
        />
      </div>
    </fieldset>
  )
}

export default ColorInput;
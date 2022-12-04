
import InputLabel from './InputLabel';
import TextField from './TextField';
import Slider from './Slider';
import InputError from './InputError';

const ColorCoordInput = ({ 
  label,
  value, 
  placeholder,
  min = 0,
  max = 200,
  step = 1,
  onFieldChange,
  onSliderChange,
  trackBackground = "transparent",
  subduedField = false,
  minMaxField = false
}) => {

  const minMax = v => {
    if (v < min) { return min; }
    if (v > max) { return max; }
    return v;
  };

  const underMin = value < min;
  const overMax = value > max;
  const invalid = minMaxField && (underMin || overMax);
  
  return(
    <div className="flex-column gap-1">
      <InputLabel>
        <span>{label}</span>
        <TextField 
          className="type-size-0"
          type="number" 
          value={value}
          placeholder={placeholder}
          step={step}
          aria-invalid={invalid}
          block
          subdued={subduedField}
          onChange={e => onFieldChange(e.target.value)}
        />
        { underMin && minMaxField &&
          <InputError className="w-block">Min is {min}</InputError>
        }
        { overMax && minMaxField &&
          <InputError className="w-block">Max is {max}.</InputError>
        }
      </InputLabel>

      <Slider.Root 
        className="SliderRoot" 
        value={[minMax(value)]} 
        min={min} 
        max={max} 
        step={1} 
        aria-label={label}
        onValueChange={value => onSliderChange(value[0])}
      >
        <Slider.Track className="SliderTrack" background={trackBackground}>
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" />
      </Slider.Root>
    </div>
  );
}

export default ColorCoordInput;
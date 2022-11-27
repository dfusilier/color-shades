
import InputLabel from './InputLabel';
import TextField from './TextField';
import Slider from './Slider';
import InputError from './InputError';

const ColorCoordInput = ({ 
  label,
  value, 
  min = 0,
  max = 200,
  step = 1,
  onFieldChange,
  onSliderChange,
  trackBackground = "transparent",
  subduedField = false
}) => {
  let fieldValue;
  let sliderValue;
  let underMin = false;
  let overMax = false;
  let invalid = false;

  if (value === "") {
    fieldValue = value;
    sliderValue = min;
  } else if (typeof value === "undefined") {
    fieldValue = min;
    sliderValue = min;
  } else if (Number.isNaN(value)) {
    fieldValue = min;
    sliderValue = min;
  } else if (isNaN(value)) {
    fieldValue = min;
    sliderValue = min;
  } else {
    value = Math.round(value);
    underMin = value < min;
    overMax = value > max;
    invalid = underMin || overMax;
    fieldValue = value;
    sliderValue = value;
    if (underMin) { sliderValue = min; } 
    if (overMax) { sliderValue = max; } 
  }
  
  return(
    <div className="flex-column gap-1">
      <InputLabel>
        {label}
        <TextField 
          className="type-size-0"
          type="number" 
          value={fieldValue}
          min={min}
          max={max}
          step={step}
          aria-invalid={invalid}
          block
          subdued={subduedField}
          onChange={e => onFieldChange(e.target.value)}
        />
        { underMin && 
          <InputError className="w-block">Min is {min}</InputError>
        }
        { overMax && 
          <InputError className="w-block">Max is {max}.</InputError>
        }
      </InputLabel>

      <Slider.Root 
        className="SliderRoot" 
        value={[sliderValue]} 
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
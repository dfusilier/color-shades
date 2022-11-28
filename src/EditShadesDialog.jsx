import React, { useState } from 'react';
import styled from "styled-components";

// Utils
import { uniq } from 'lodash';

// Components
import Dialog from './components/Dialog';
import Box from './components/Box';
import Chip from './components/Chip';
import ChipGroup from './components/ChipGroup';
import TextField from './components/TextField';
import Button from './components/Button';
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import InputLabel from './components/InputLabel';
import InputError from './components/InputError';
import toCssColor from './utils/toCssColor';

const EditShadesDialog = ({ shade, shades, getShadeColors, onSave }) => {
  const [newShades, setNewShades] = useState(shades);
  const [newShade, setNewShade] = useState("");
  const shadeColors = getShadeColors(newShades);

  const min = 0;
  const max = 200;

  const underMin = newShade < min;
  const overMax = newShade > max;
  const invalid = underMin || overMax;

  const handleSubmit = e => {
    e.preventDefault();
    if (newShade && 0 <= newShade && newShade <= 200) {
      setNewShades(uniq([ ...newShades, parseInt(newShade) ]).sort((a, b) => a - b));
      setNewShade("");
    }
  };

  return (
    <Box>
      <Box.Column>
        <Dialog.Header>
          <Dialog.Title>
            <div className="type-size-3">Edit shades</div>
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <ChipGroup>
            {newShades.map((thisShade, i) => 
              <Chip 
                bg={toCssColor(shadeColors[i])} 
                key={i}
              >
                {thisShade}
                {thisShade === shade 
                  ? <StarIcon className="h-1 w-1" />
                  : <ChipButton 
                      aria-label="Remove shade"
                      className="flex-row flex-align-center"
                      onClick={e => setNewShades(
                        newShades.filter(s => s !== thisShade)
                      )}
                    >
                        <XMarkIcon className="h-1 w-1" />
                    </ChipButton>
                }
              </Chip>
            )}
          </ChipGroup>
          <form className="flex-row gap-0 flex-align-center" onSubmit={handleSubmit}>
            <InputLabel>
                <span className="screen-reader-only">New shade</span>
                <TextField 
                  block
                  aria-label="New shade"
                  type="number" 
                  value={newShade}
                  aria-invalid={invalid}
                  onChange={e => {
                    e.preventDefault()
                    if (e.target.value.toString().length <= 3) {
                      setNewShade(e.target.value);
                    }
                  }} 
                  min={min}
                  max={max}
                  size={20}
                  step={1}
                />
                { underMin &&
                  <InputError className="w-block">Shade must be {min} or lighter.</InputError>
                }
                { overMax  &&
                  <InputError className="w-block">Shade must be {max} or darker.</InputError>
                }
            </InputLabel>
            
            <Button 
              prominence="secondary" 
              size="medium" 
              noWrap 
              onClick={handleSubmit}>
              Add shade
            </Button>
          </form>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Dialog.DismissingAction prominence="secondary" size="large">Cancel</Dialog.DismissingAction>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Dialog.ConfirmingAction onClick={() => onSave(newShades)}>Save</Dialog.ConfirmingAction>
          </Dialog.Close>
        </Dialog.Footer>
      </Box.Column>
    </Box>
  );
}

const ChipButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 999px;
  transition: box-shadow 0.075s ease-out;
  &:focus {
    outline: none; 
    box-shadow: 0 0 0 3px currentColor;
    transition: box-shadow 0.1s ease-out; 
  }
`

export default EditShadesDialog;


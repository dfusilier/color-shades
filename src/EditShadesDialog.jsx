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

const EditShadesDialog = ({ shade, shades, getShadeColors, onSave }) => {
  const [newShades, setNewShades] = useState(shades);
  const [newShade, setNewShade] = useState("");
  const shadeColors = getShadeColors(newShades);

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
                bg={shadeColors[i].toString({ format: "hex" })} 
                key={i}>
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
          <div className="flex-row gap-0 flex-align-center">
            <TextField 
              aria-label="New shade"
              type="number" 
              value={newShade}
              onChange={e => setNewShade(e.target.value)} 
              min={0}
              max={200}
              step={1}
            />
            <Button prominence="secondary" size="medium" noWrap onClick={e => {
              newShade && setNewShades(uniq([ ...newShades, parseInt(newShade) ]).sort((a, b) => a - b))
              setNewShade("")
            }}>
              Add shade
            </Button>
          </div>
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
    box-shadow: 0 0 0 3px var(--color-fg);
    transition: box-shadow 0.1s ease-out; 
  }
`

export default EditShadesDialog;


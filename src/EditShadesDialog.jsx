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
import { Cross2Icon, StarFilledIcon } from '@radix-ui/react-icons'

const EditShadesDialog = ({ shade, shades, getShadeColors, onSave }) => {
  const [newShades, setNewShades] = useState(shades);
  const [newShade, setNewShade] = useState("");
  const shadeColors = getShadeColors(newShades);

  return (
    <Box>
      <Box.Column>
        <Box.Cell>
          <Dialog.Title>
            <div className="type-size-3">Edit shades</div>
          </Dialog.Title>
        </Box.Cell>
        <ContentBox>
          <ChipGroup>
            {newShades.map((thisShade, i) => 
              <Chip 
                bg={shadeColors[i].toString({ format: "hex" })} 
                key={i}>
                  {thisShade}
                  {thisShade === shade 
                    ? <StarFilledIcon />
                    : <ChipButton 
                        className="flex-row flex-align-center"
                        onClick={e => setNewShades(
                          newShades.filter(s => s !== thisShade)
                        )}
                      >
                          <Cross2Icon />
                      </ChipButton>
                  }
                  
              </Chip>
            )}
          </ChipGroup>
          <div className="flex-row gap-0 flex-align-center">
            <TextField 
              type="number" 
              value={newShade}
              onChange={e => setNewShade(e.target.value)} 
              min={0}
              max={200}
              step={1}
            />
            <Button prominence="secondary" size="medium" noWrap onClick={e => {
              newShade && setNewShades(uniq([ ...newShades, newShade ]).sort((a, b) => a - b))
              setNewShade("")
            }}>
              Add shade
            </Button>
          </div>
        </ContentBox>
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

// const ChipsAndForm = styled.div`
//   display: grid;
//   grid-template-columns: 5fr 3fr;
//   gap: 1rem;
// `

const ContentBox = styled(Box.Cell)`
  --box-padding-block: 2rem;
  display: grid;
  grid-template-rows: auto auto;
  gap: 2rem;
  padding-block-end: calc(var(--box-padding-block) + 0.25rem);

`

const ChipButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 999px;
  &:focus {
    outline: none; 
  }
  &:focus-visible {
    outline: 3px solid currentColor;
  }
`

export default EditShadesDialog;


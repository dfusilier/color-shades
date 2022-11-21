import React from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';

// Utils
import useQueryParams from './utils/useQueryParams';
import suggestShades from './utils/suggestShades';
import createInterpolants from './utils/createInterpolants';
import shadeToContrast from './utils/shadeToContrast';
import { uniq } from 'lodash';

// Components
import Section from './components/Section';
import Box from './components/Box';
import Button from './components/Button';
import Palette from './components/Palette';
import Tabs from './components/Tabs';
import ColorCoordForm from './ColorCoordForm';
import Dialog from './components/Dialog';
import EditShadesDialog from './EditShadesDialog';
import { Pencil1Icon, CopyIcon } from '@radix-ui/react-icons'

const MoreShadesSection = ({ colorObj, shade }) => {
  let [queryParams, setQueryParams] = useQueryParams();

  const shades = queryParams.shades 
    ? queryParams.shades.split('-')
    : uniq([10, 25, 50, 75, 100, 125, 150, 175, shade]).sort((a, b) => a - b);
  
  const { setLightness } = createInterpolants(
    colorObj,
    queryParams.hStart,
    queryParams.hEnd,
    queryParams.sStart,
    queryParams.sEnd,
  );

  const getShadeColors = shades => {
    return suggestShades({
      manipulation: change => setLightness(change),
      targets: shades.map(shade => shadeToContrast(shade))
    }).map(shade => shade.to("srgb"));
  }

  const shadeColors = getShadeColors(shades);
 
  return (
    <Section>
      <Box bg={"#161616"}>
        <Box.Column>

          <Box.Cell className="flex-column gap-0">
            <div className="flex-row flex-gap-1">
              <h2 className="type-size-4 flex-fill-x flex-align-center">More shades</h2>
              <div className="flex-fit-x flex-row gap-00">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button prominence="secondary" icon><Pencil1Icon /></Button>
                  </Dialog.Trigger>
                  
                  <Dialog.Portal>
                    <Dialog.Overlay 
                      bg={new Color(
                        "srgb",
                        getShadeColors([10])[0].coords,
                        0.96
                      ).to("srgb").toString() 
                        
                    } />
                    <Dialog.Content>
                      <EditShadesDialog 
                        shade={shade}
                        shades={shades} 
                        getShadeColors={getShadeColors}
                        onSave={shades => setQueryParams({
                          ...queryParams,
                          shades: shades.join("-")
                        })}
                      />
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <Button prominence="secondary" icon><CopyIcon /></Button>
              </div>
            </div>
          </Box.Cell>

          <PaletteAndTabs>
            <Palette>
              {shadeColors.map((shadeColor, i) => (
                <Palette.Shade bg={shadeColor.toString({ format: "hex" })} key={i}>
                  <div>
                    {shades[i] === shade 
                      ? `${shades[i]} ★`
                      : shades[i]
                    }
                  </div>
                  <div>{shadeColor.toString({ format: "hex" })}</div>
                </Palette.Shade>
              ))}
            </Palette>

            <Tabs.Root className="TabsRoot" defaultValue="saturation">
              <Tabs.List className="TabsList" aria-label="Edit palette">
                <Tabs.Trigger className="TabsTrigger" value="hue">
                  Hue
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="saturation">
                  Sat
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.ContentWrapper>
                <Tabs.Content className="TabsContent" value="hue" >
                  <ColorCoordForm coordType={"hue"} color={colorObj} />
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="saturation" >
                  <ColorCoordForm coordType={"saturation"} color={colorObj} />
                </Tabs.Content>
              </Tabs.ContentWrapper>
            </Tabs.Root>

          </PaletteAndTabs>
        </Box.Column>
      </Box>
    </Section>
  );
}

export default MoreShadesSection;

const PaletteAndTabs = styled(Box.Row)`
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 77vh;
  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`
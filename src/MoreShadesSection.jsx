import React, { useState } from 'react';
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
import Tooltip from './components/Tooltip';
import Palette from './components/Palette';
import Tabs from './components/Tabs';
import ColorCoordForm from './ColorCoordForm';
import Dialog from './components/Dialog';
import EditShadesDialog from './EditShadesDialog';
import { SwatchIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const MoreShadesSection = ({ colorObj, shade }) => {
  let [queryParams, setQueryParams] = useQueryParams();
  let [openEditShadesTooltip, setOpenEditShadesTooltip ] = useState(false);
  let [openCopyTooltip, setOpenCopyTooltip ] = useState(false);
  let [copied, setCopied ] = useState(false);

  const shades = queryParams.shades 
    ? queryParams.shades.split('-').map(thisShade => parseInt(thisShade))
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
  const shadeHexes = shadeColors.map(shade => shade.toString({ format: "hex" }));
 
  return (
    <Section aria-labelledby="more-shades-heading">
      <Box bg={"#161616"}>
        <Box.Column>

          <Box.Cell className="flex-column gap-0">
            <div className="flex-row flex-gap-1 flex-align-center">
              <h2 id="more-shades-heading" className="type-size-4 flex-fill-x">More shades</h2>
              <div className="flex-fit-x flex-row gap-0" style={{ marginInlineEnd: "-0.5rem"}}>
                <Dialog.Root>
                  <Tooltip.Provider>
                    <Tooltip.Root open={openEditShadesTooltip}>
                      <Dialog.Trigger asChild>
                        <Tooltip.Trigger 
                          asChild
                          onFocus={e => {
                            e.preventDefault()
                            setOpenEditShadesTooltip(true)
                          }}
                          onBlur={e => {
                            e.preventDefault()
                            setOpenEditShadesTooltip(false)
                          }}
                          onMouseEnter={e => {
                            e.preventDefault()
                            setOpenEditShadesTooltip(true)
                          }}
                          onMouseLeave={e => {
                            e.preventDefault()
                            setOpenEditShadesTooltip(false)
                          }}
                        >
                          <Button prominence="secondary" icon>
                            <SwatchIcon className="h-2 w-2"/>
                          </Button>
                        </Tooltip.Trigger>
                      </Dialog.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content 
                          sideOffset={6} 
                        >
                          Edit shades
                          <Tooltip.Arrow />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <Dialog.Portal>
                    <Dialog.Overlay 
                      bg={new Color(
                        "srgb",
                        getShadeColors([10])[0].coords,
                        0.96
                      ).to("srgb").toString() 
                        
                    } />
                    <Dialog.Content>
                      <div>
                      <EditShadesDialog 
                        shade={shade}
                        shades={shades} 
                        getShadeColors={getShadeColors}
                        onSave={shades => setQueryParams({
                          ...queryParams,
                          color: colorObj.toString({ format: "hex" }),
                          shades: shades.join("-")
                        })}
                      />
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <Tooltip.Provider>
                  <Tooltip.Root open={openCopyTooltip}>
                    <Tooltip.Trigger 
                      asChild
                      onFocus={e => {
                        e.preventDefault();
                        setOpenCopyTooltip(true);
                      }}
                      onBlur={e => {
                        e.preventDefault();
                        setOpenCopyTooltip(false);
                        setCopied(false);
                      }}
                      onMouseEnter={e => {
                        e.preventDefault();
                        setOpenCopyTooltip(true);
                      }}
                      onMouseLeave={e => {
                        e.preventDefault();
                        setOpenCopyTooltip(false);
                        setCopied(false);
                      }}
                    >
                      <Button 
                        prominence="secondary" 
                        icon 
                        onClick={e => {
                          e.preventDefault();
                          setCopied(true);
                          navigator.clipboard.writeText(
                            JSON.stringify(
                              shades.reduce((acc, shade, i) => ({
                                ...acc, [shade]: shadeHexes[i]
                              }), {}),
                              null, 
                              2
                            )
                          );
                        }}
                      >
                        <DocumentDuplicateIcon className="h-2 w-2" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content sideOffset={6}>
                        {copied ? "Copied!" : "Copy values"}
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            </div>
          </Box.Cell>

          <PaletteAndTabs>
            <Palette>
              {shades.map((thisShade, i) => (
                <Palette.Shade bg={shadeHexes[i]} key={i}>
                  <div>
                    {thisShade === shade
                      ? `${shades[i]} ★`
                      : shades[i]
                    }
                  </div>
                  <div>{shadeHexes[i]}</div>
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

                <Tabs.Content className="TabsContent" value="hue" >
                  <ColorCoordForm coordType={"h"} color={colorObj} />
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="saturation" >
                  <ColorCoordForm coordType={"s"} color={colorObj} />
                </Tabs.Content>
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
  min-height: 68vh;
  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`
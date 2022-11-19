import React from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';

// Utils
import useQueryParams from './utils/useQueryParams';
import shadeFromContrast from './utils/shadeFromContrast';
import cssTheme from './utils/makeTheme';
import suggestShades from './utils/suggestShades';
import createInterpolants from './utils/createInterpolants';
import shadeToContrast from './utils/shadeToContrast';
import { uniq, sample } from 'lodash';

// Components
import GlobalStyles from './GlobalStyles';
import Box from './components/Box';
import TextField from './components/TextField';
import ColorPicker from './components/ColorPicker'; 
import Palette from './components/Palette';
import Tabs from './components/Tabs';
import ColorCoordForm from './ColorCoordForm';

const App = () => {
  let [queryParams, setQueryParams] = useQueryParams();

  // Undefined is returned when there's no color query.
  // Null when there's a blank color query,
  // which happens when someone clears the field.
  let color = typeof queryParams.color === "undefined"
    ? sample(colorDefaults)
    : queryParams.color;

  let colorObj;
  try {
    colorObj = new Color(color);
  } catch {
    try {
      new Color("#" + color);
      setQueryParams({ 
        color: "#" + color
      });
    } catch {
      console.log("catch", color);
    }
  }

  const shade = colorObj ? Math.round(
    shadeFromContrast(colorObj.contrastWCAG21(black))
  ) : "?";
  
  const shades = uniq([10, 25, 50, 75, 100, 125, 150, 175, shade]).sort((a, b) => a - b);
  
  let shadeColors;

  if (colorObj) {
    const { setLightness } = createInterpolants(
      colorObj,
      queryParams.hStart,
      queryParams.hEnd,
      queryParams.sStart,
      queryParams.sEnd,
    );
    shadeColors = suggestShades({
      manipulation: change => setLightness(change),
      targets: shades.map(shade => shadeToContrast(shade))
    }).map(shade => shade.to("srgb"));
  }

  return (
    <div className="App">
      <GlobalStyles bg={colorObj ? color : undefined} />
      <Header>
        <Box bg={"#161616"}>
          <Box.Column>
            <Box.Cell className="flex-column gap-0">
              <h1 className="type-size-4">Color shade</h1>
              <p className="type-size-1">Calculate a color's shade and use it to quickly determine color contrast.</p>
            </Box.Cell>
            <Box.Cell>
              <fieldset className="stack-00">
                <legend>Color</legend>
                <div className="flex-row gap-1" style={{ alignItems: "end", marginBlockEnd: "8px"}}>
                  <TextField 
                    className="type-size-2"
                    aria-label="Enter color"
                    id="color-input" 
                    name="color-input"
                    type="text" 
                    value={color}
                    onChange={e => setQueryParams({ 
                      color: e.target.value 
                    })} 
                  />
                  <ColorPicker 
                    aria-label="Edit color"
                    value={colorObj ? color : "#000000"} 
                    onChange={e => setQueryParams({ color: e.target.value })}
                    bg={colorObj ? color : "#000000"} 
                  />
                </div>
              </fieldset>
            </Box.Cell>
            <Box.ResponsiveRow>
              <Box.Cell className="flex-column flex-fit-x gap-000">
                <h2 style={{whiteSpace: "nowrap"}}>Shade (0–200)</h2>
                <div className="type-size-5">{shade}</div>
              </Box.Cell>
              <Box.Cell className="flex-column gap-000">
                <h2>How to use</h2>
                <ul>
                  <li>Use shades when naming colors (for example, "green{shade}").</li>
                  <li>Two colors with a difference of 100 or more have ≥ 4.5 contrast.</li>
                  <li>Two colors with a difference of 75 or more have ≥ 3.0 contrast.</li>
                </ul>
              </Box.Cell>
            </Box.ResponsiveRow>
          </Box.Column>
        </Box>
      </Header>

    { shadeColors && 
      <Section>
        <Box bg={"#161616"}>
          <Box.Column>

            <Box.Cell className="flex-column gap-0">
              <h2 className="type-size-4">More shades</h2>
              {/* <p className="type-size-1">Generate additional shades of the same color.</p> */}
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

            {/* <Box.Cell></Box.Cell> */}
          </Box.Column>
        </Box>
      </Section>
    }
    </div>
  );
}

export default App;

const black = new Color("black");
const colorDefaults = [
  "#2E8B57", // seagreen
  "#708090", // slategray
  "#FF6347", // tomato
  "#1E90FF", // dodgerblue
  "#87CEFA", // lightskyblue
  "#E6E6FA", // lavender
  "#FFE4E1", // mistyrose
  "#483D8B", // darkslateblue
  "#FFD700", // gold
  "#800000"  // maroon
];

const Section = styled.section`
  ${({bg}) => bg ? cssTheme(bg) : ""}
  padding-block: 12px;
  padding-inline: 24px;
  margin: auto;
  max-width: 864px;

  &:first-child { padding-block-start: 24px; }
  &:last-child { padding-block-end: 24px; }

  @media (min-width: 768px) {
    padding-block: 12px;
    padding-inline: 48px;

    &:first-child { padding-block-start: 48px; }
    &:last-child { padding-block-end: 48px; }
  }
`
const Header = styled(Section)`
  display: flex;
  align-items: center;
  & > * { width: 100%; }
  @media (min-width: 768px) {
    min-height: calc(100vh - 2.5rem);
  }
`
const PaletteAndTabs = styled(Box.Row)`
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 77vh;
  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`
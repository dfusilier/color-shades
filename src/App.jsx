import React from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';
import { useSearchParams } from 'react-router-dom';

// Utils
import calcShade from './utils/shadeFromContrast';
import cssTheme from './utils/makeTheme';
import pickRandom from './utils/pickRandom';
import suggestShades from './utils/suggestShades';
import createInterpolants from './utils/createInterpolants';
import shadeToContrast from './utils/shadeToContrast';
import { uniq } from 'lodash';

// Components
import GlobalStyles from './GlobalStyles';
import Box from './components/Box';
// import FormGroup from './components/FormGroup';
import TextField from './components/TextField';
import ColorPicker from './components/ColorPicker'; 
import Palette from './components/Palette';
import Tabs from './components/Tabs';
import IntForm from './IntForm';

const App = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const colorSearchParam = searchParams.get("color");

  // Null is returned when there's no color query.
  // Undefined when there's a blank color query,
  // which happens when someone clears the field.
  const colorString = colorSearchParam === null ? pickRandom(colorStringDefaults) : colorSearchParam;
  
  let color;
  try {
    color = new Color(colorString);
  } catch {
    try {
      new Color("#" + colorString);
      setSearchParams({ color: "#" + colorString });
    } catch {}
  }

  const shade = color ? 
    Math.round(
      calcShade(color.contrastWCAG21(black))
    ) : "?";

  const { setLightness } = createInterpolants(color);

  const shadeTargets = uniq([10, 25, 50, 75, 100, 125, 150, 175, shade]).sort((a, b) => a - b);
  const contrastTargets = shadeTargets.map(shade => shadeToContrast(shade));
  const shades = suggestShades({
    manipulation: change => setLightness(change),
    targets: contrastTargets
  }).map(shade => shade.to("srgb"));

    
  return (
    <div className="App">
      <GlobalStyles bg={color ? colorString : undefined} />
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
                    value={colorString}
                    onChange={e => setSearchParams({ color: e.target.value })} 
                  />
                  <ColorPicker 
                    aria-label="Edit color"
                    value={colorString} 
                    onChange={e => setSearchParams({ color: e.target.value })}
                    bg={colorString} 
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

      <Section>
        <Box bg={"#161616"}>
          <Box.Column>

            <Box.Cell className="flex-column gap-0">
              <h2 className="type-size-4">More shades</h2>
              {/* <p className="type-size-1">Generate additional shades of the same color.</p> */}
            </Box.Cell>

            <PaletteAndTabs>
              <Palette>
                {shades.map((shadeColor, i) => (
                  <Palette.Shade bg={shadeColor.toString({ format: "hex" })} key={i}>
                    <div>
                      {shadeTargets[i] === shade 
                        ? `${shadeTargets[i]} ★`
                        : shadeTargets[i]
                      }
                    </div>
                    <div>{shadeColor.toString({ format: "hex" })}</div>
                  </Palette.Shade>
                ))}
              </Palette>

              <Tabs.Root className="TabsRoot" defaultValue="hue">
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
                    <IntForm colorProperty={"hue"} color={color} />
                  </Tabs.Content>
                  <Tabs.Content className="TabsContent" value="saturation" >
                    <IntForm colorProperty={"saturation"} color={color} />
                  </Tabs.Content>
                </Tabs.ContentWrapper>
              </Tabs.Root>

            </PaletteAndTabs>

            <Box.Cell></Box.Cell>
          </Box.Column>
        </Box>
      </Section>
    </div>
  );
}

export default App;

const black = new Color("black");
const colorStringDefaults = [
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
  display: flex;
  padding-block: 8px;
  padding-inline: 24px;
  margin: auto;
  width: 100%;
  max-width: 864px;
  align-items: center;

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
  @media (min-width: 768px) {
    min-height: calc(100vh - 2.5rem);
  }
`
const PaletteAndTabs = styled(Box.Row)`
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 72vh;
  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`
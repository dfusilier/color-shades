import React from 'react';
import styled from "styled-components";
import Color from 'color';
import { useSearchParams } from 'react-router-dom';

// Utils
import calcShade from './utils/calcShade';
import cssTheme from './utils/makeTheme';
import pickRandom from './utils/pickRandom';

// Components
import GlobalStyles from './GlobalStyles';
import Box from './components/Box';
import TextField from './components/TextField';
import ColorPicker from './components/ColorPicker';

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
      calcShade(color.contrast(black))
    ) : "?";
    
  return (
    <div className="App">
      <GlobalStyles bg={color ? colorString : undefined} />
      <Header>
        
        <Box bg={"#161616"}>
          <Box.Column>
            <Box.Cell className="flex-column gap-0">
              <h1 className="type-size-4">Color shades</h1>
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
              <Box.Cell className="flex-column gap-000">
                <h2>Shade (0–200)</h2>
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

const Header = styled.div`
  ${({bg}) => bg ? cssTheme(bg) : ""}
  display: flex;
  gap: 2rem;
  padding-block: 24px;
  padding-inline: 24px;
  margin: auto;
  width: 100%;
  max-width: 864px;
  align-items: center;

  @media (min-width: 768px) {
    padding-block: 48px;
    padding-inline: 48px;
    min-height: 95vh;
  }
`

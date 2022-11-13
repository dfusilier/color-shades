import React, { useState } from 'react';
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
import FormGroup from './components/FormGroup';
import TextField from './components/TextField';

const App = () => {
  let [searchParams, setSearchParams] = useSearchParams();
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
  const colorString = searchParams.get("color") || pickRandom(colorStringDefaults);

  const black = new Color("black");
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
      calcShade(color.contrast(black, "WCAG21"))
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
              <FormGroup className="flex-column gap-00" style={{ marginBlockEnd: "8px"}}>
                <label htmlFor="color-input">Color</label>
                <TextField 
                  className="type-size-2"
                  id="color-input" 
                  name="color-input"
                  type="text" 
                  value={colorString}
                  onChange={e => setSearchParams({ color: e.target.value })} 
                />
              </FormGroup>
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

const Header = styled.div`
  ${({bg}) => bg ? cssTheme(bg) : ""}

  display: flex;
  gap: 2rem;
  padding-block: 48px;
  padding-inline: 24px;
  margin: auto;
  max-width: 864px;
  align-items: center;

  @media (min-width: 768px) {
    padding-inline: 48px;
    min-height: 95vh;
  }
`




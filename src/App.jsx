import React, { useState } from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';
import calcShade from './utils/calcShade';
import cssTheme from './utils/makeTheme';

import GlobalStyles from './GlobalStyles';
import FormGroup from './components/FormGroup';
import TextField from './components/TextField';
import Box from './components/Box';
// import BigSwatch from './components/BigSwatch';


const App = () => {
  const [colorString, setColorString] = useState("#2E8B57");
  const black = new Color("black");
  let color;

  try {
    color = new Color(colorString);
  } catch {
    try {
      new Color("#" + colorString);
      setColorString("#" + colorString);
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
            <Box.Cell className="flex-column gap-00">
              <h1 className="type-size-4r">Color shades</h1>
              <p className="type-size-1">Use shades to determine accessible color contrast at a glance.</p>
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
                  onChange={e => setColorString(e.target.value)} 
                />
              </FormGroup>
            </Box.Cell>
            <Box.ResponsiveRow>
              <Box.Cell className="flex-column gap-000">
                <h2>Shade</h2>
                <div className="type-size-5r">{shade}</div>
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
  padding: 24px 24px;
  margin: auto;
  max-width: 864px;
  min-height: 95vh;
  align-items: center;

  @media (min-width: 768px) {
      padding: 48px 48px;
  }
`




import React from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';

// Utils
import useQueryParams from './utils/useQueryParams';
import shadeFromContrast from './utils/shadeFromContrast';
import { sample } from 'lodash';

// Components
import GlobalStyles from './GlobalStyles';
import Section from './components/Section';
import Box from './components/Box';
import TextField from './components/TextField';
import ColorPicker from './components/ColorPicker'; 
import MoreShadesSection from './MoreShadesSection';

const App = () => {
  let [
    queryParams, 
    setQueryParams,
    setThrottledQueryParams,
  ] = useQueryParams();

  // Undefined is returned when there's no color query.
  // Null when there's a blank color query,
  // which happens when someone clears the field.
  let color = typeof queryParams.color === "undefined"
    ? sample(colorDefaults)
    : queryParams.color;

  let colorObj;
  let colorName;
  try {
    colorObj = new Color(color);
    const hue = colorObj.to("hsl").coords[0];
    colorName = Number.isNaN(hue)
      ? "gray"
      : hueRanges.find(hueRange => 
        hueRange.min <= hue && hue <= hueRange.max
      ).hueName;
    if(colorName === "black" || colorName === "white") {
      colorName = "neutral";
    }
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
  
  if (colorObj) {
    document.body.style.backgroundColor = color;
  }

  return (
    <div className="App">
      <GlobalStyles bg={colorObj ? color : undefined} />
      <Header>
        <Box bg={"#161616"}>
          <Box.Column>
            <Box.Cell className="flex-column gap-0">
              <TitleAndLink>
                <h1 className="type-size-4">Color shades</h1>
                <span className="type-size-00 color-fg-subdued">by <a href="https://twitter.com/davidfusilier">David Fusilier</a></span>
              </TitleAndLink>
              <p className="type-size-1">Calculate a color's shade and use it to quickly determine color contrast.</p>
            </Box.Cell>
            <Box.Cell>
              <fieldset className="stack-00">
                <legend>Color</legend>
                <div className="flex-row gap-1" style={{ alignItems: "end", marginBlockEnd: "8px"}}>
                  <TextField 
                    block
                    className="type-size-2"
                    aria-label="Enter color"
                    id="color-input" 
                    name="color-input"
                    type="text" 
                    value={color}
                    onChange={e => setQueryParams({ 
                      color: e.target.value
                    }, 0)} 
                  />
                  <ColorPicker 
                    aria-label="Edit color"
                    value={colorObj ? color : "#000000"} 
                    onChange={e => setThrottledQueryParams({ color: e.target.value })}
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
                <ul className="list-bulleted">
                  <li>Use shades when naming colors (for example, "{colorName}{shade}").</li>
                  <li>Two colors with a difference of 100 or more have ≥ 4.5 contrast.</li>
                  <li>Two colors with a difference of 75 or more have ≥ 3.0 contrast.</li>
                </ul>
              </Box.Cell>
            </Box.ResponsiveRow>
          </Box.Column>
        </Box>
      </Header>

    { colorObj && 
      <MoreShadesSection colorObj={colorObj} shade={shade} />
    }

    {/* <Section>
      <Box>
        <Box.Cell>
          <div> Made by David Fusilier</div>
          <div className="type-size-00">Twitter • Github • LinkedIn</div>
        </Box.Cell>
      </Box>
    </Section> */}
      
    </div>
  );
}

export default App;

const black = new Color("black");
const colorDefaults = [
  "#2E8B57", // seagreen
  "#FF6347", // tomato
  "#2493FF", // dodgerblue
  "#483D8B", // darkslateblue
  "#CE3794", // fuchsia
];

const Header = styled(Section)`
  display: flex;
  align-items: center;
  & > * { width: 100%; }
  @media (min-width: 768px) {
    min-height: calc(100vh - 2.5rem);
  }
`

const TitleAndLink = styled.div`
  & > * {
    display: block;
    margin-block-end: 0.25rem;
  }
  @media (min-width: 768px) {
    & > * {
      display: inline;
      margin-block-end: 0;
      margin-inline-end: 0.75rem;
    }
  }
`

const hueRanges = [
  {
    min: 0,
    max: 11,
    hueName: "red"
  },
  {
    min: 11,
    max: 40,
    hueName: "orange"
  },
  {
    min: 40,
    max: 77,
    hueName: "yellow"
  },
  {
    min: 77,
    max: 167,
    hueName: "green"
  },
  {
    min: 167,
    max: 248,
    hueName: "blue"
  },
  {
    min: 248,
    max: 280,
    hueName: "purple"
  },
  {
    min: 280,
    max: 335,
    hueName: "pink"
  },
  {
    min: 335,
    max: 360,
    hueName: "red"
  }
]
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';

// Utils
import useQueryParams from './utils/useQueryParams';
import shadeFromContrast from './utils/shadeFromContrast';
import toCssColor from './utils/toCssColor';
import { sample } from 'lodash';

// Components
import GlobalStyles from './GlobalStyles';
import Section from './components/Section';
import Box from './components/Box';
import MoreShadesSection from './MoreShadesSection';
import ColorInput from './components/ColorInput';
import getHueName from './utils/getHueName';

const supportedColorSpaces = [
  "srgb", 
  "hsl", 
  "lch", 
  "hwb", 
  "hsv",
  "rgb",
  "rgba"
];

const App = () => {
  let [ queryParams,  setQueryParams, setThrottledQueryParams ] = useQueryParams();
  let [ showErrors, setShowErrors ] = useState(false);

  // Undefined is returned when there's no color query.
  // Null when there's a blank color query,
  // which happens when someone clears the field.
  let colorValue = typeof queryParams.color === "undefined"
    ? sample(colorDefaults)
    : queryParams.color;

  let colorObj; 
  let isTransparent = false;
  let isNotSupportedColorSpace = false;
  let isNotColor = false;
  let shade; 
  let colorCss;
  let colorName;

  try {
    colorObj = new Color(colorValue);
    isNotSupportedColorSpace = !supportedColorSpaces.find(space => space === colorObj.space.id);
    isTransparent = colorObj.alpha !== 1;
    colorObj = colorObj.to("hsl");
  } catch {
    isNotColor = true;
  }

  // If adding "#" makes it a valid hex, add it.
  useEffect(() => {
    try {
      new Color("#" + colorValue);
      setQueryParams({ 
        color: "#" + colorValue
      });
    } catch {}
  }, [colorObj, colorValue, setQueryParams]);

  const error = isNotColor || isNotSupportedColorSpace || isTransparent;
  const errorMessage = 
    isNotColor 
      ? "Enter a valid CSS color."
      : isNotSupportedColorSpace 
        ? "Sorry, that color space isn't supported."
        : isTransparent 
          ? "Shades don't work with transparent colors."
          : undefined;

  // Show errors if they aren't corrected
  // after a set amount of time.
  useEffect(() => {
    setShowErrors(false);
    if (error) {
      setTimeout(() => setShowErrors(true), 1500);
    }
  }, [error, colorValue]);

  if (error) {
    shade = "?";
    colorCss = "#000000";
    colorName = "green";
  } else {
    shade = Math.round(shadeFromContrast(colorObj.contrastWCAG21(black)));
    colorCss = toCssColor(colorObj);
    colorName = getHueName(colorObj.to("hsl").coords[0]);
  }

  document.body.style.backgroundColor = colorCss;
  
  return (
    <div className="App" style={{ minHeight: "100vh"}}>
      <GlobalStyles />
      <Header aria-labelledby="color-shades-heading">
        <Box>
          <Box.Column>
            <Box.Cell className="flex-column gap-0">
              <TitleAndLink>
                <h1 id="color-shades-heading" className="type-size-4">Color shades</h1>
                <span className="type-size-00 color-fg-subdued">by <a href="https://twitter.com/davidfusilier">David Fusilier</a></span>
              </TitleAndLink>
              <p className="type-size-1">Calculate a color's shade and use it to quickly determine color contrast.</p>
            </Box.Cell>
            <Box.Cell>
              <ColorInput
                value={colorValue}
                valuePicker={colorCss}
                error={showErrors && error}
                errorMessage={showErrors && errorMessage}
                onFieldChange={e => setQueryParams({ 
                  color: e.target.value
                })}
                onPickerChange={e => setThrottledQueryParams({ 
                  color: e.target.value
                })}
              />
            </Box.Cell>
            <Box.ResponsiveRow>
              <Box.Cell className="flex-column flex-fit-x gap-000">
                <h2 style={{whiteSpace: "nowrap"}}>Shade (0–200)</h2>
                <div className="type-size-5">{shade}</div>
              </Box.Cell>
              <Box.Cell className="flex-column gap-000">
                <h2>How to use</h2>
                <ul className="list-bulleted">
                  <li>Use shades when naming colors (for example, "{colorName}{error ? 100 : shade}").</li>
                  <li>Two colors with a difference of 100 or more have ≥ 4.5 contrast.</li>
                  <li>Two colors with a difference of 75 or more have ≥ 3.0 contrast.</li>
                </ul>
              </Box.Cell>
            </Box.ResponsiveRow>
          </Box.Column>
        </Box>
      </Header>

    { !error && 
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
    min-height: calc(100vh - 6rem - 1.5rem);
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


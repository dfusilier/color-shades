import styled from "styled-components";
import Box from "./Box";
import Button from "./Button";

const ButtonBar = styled(Box.Row)`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(min-content, 1fr);
  
  ${props => props.responsive && `
    grid-auto-flow: row;
    grid-auto-rows: minmax(min-content, 1fr);

    @media (max-width: 767px) {
      grid-auto-flow: row;
      grid-auto-rows: minmax(min-content, 1fr);
    }
  `}

  ${Button} {
    padding-inline: var(--box-padding-inline);
    border-radius: 0;
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
  }
`

export default ButtonBar;
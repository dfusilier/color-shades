import styled from "styled-components";
import suggestTextColor from "../utils/suggestTextColor";

const Chip = styled.button.attrs(props => ({
  prominence: props.prominence || "primary",
  size: props.size || "medium"
}))`
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding-inline: 0.75rem;
  padding-block: 0.25rem;
  border-radius: 1rem;
  transition: outline 0.075s ease-out;
  border: 1px solid var(--color-fg);

  &:focus {
    outline: 3px solid var(--color-fg);
  }
  
  ${props => props.bg && `
    background: ${bg};
    color: ${suggestTextColor(bg)};
  `}
`

export default Chip;
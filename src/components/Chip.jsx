import styled from "styled-components";
import suggestTextColor from "../utils/suggestTextColor";

const Chip = styled.li.attrs(props => ({
  prominence: props.prominence || "primary",
  size: props.size || "medium",
  style: props.bg 
    ? ({
      background: props.bg,
      color: suggestTextColor(props.bg)
    }) : undefined
}))`
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding-inline: 0.75rem;
  padding-block: 0.25rem;
  border-radius: 2rem;
  gap: 0.5rem;
  transition: outline 0.075s ease-out;
  border: 1px solid var(--color-fg);
  appearance: none;

  &:focus {
    outline: 3px solid var(--color-fg);
  }
  
  ${props => props.bg && `
    background: ${props => props.bg};
    color: ${props => suggestTextColor(props.bg)};
  `}
`

export default Chip;
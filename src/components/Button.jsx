import styled from "styled-components";

const Button = styled.button.attrs(props => ({
  prominence: props.prominence || "primary",
  size: props.size || "medium"
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  padding-inline: 1.5rem;
  padding-block: 0.5rem;
  border-radius: 1.5rem;
  transition: outline 0.075s ease-out;
  position: relative;
  cursor: pointer;

  white-space: ${props => props.noWrap ? "nowrap" : "normal "};

  &:focus { outline: 0; }
  transition: box-shadow 0.075s ease-out;
  &:after {
    transition: box-shadow 0.075s ease-out;
  }

  ${props => props.focusType === "interior" ? `
    &:focus-visible::after {
      content: "";
      position: absolute;
      top: 9px;
      bottom: 9px;
      left: 9px;
      right: 9px;
      border-radius: 1px;
      box-shadow: 0 0 0 3px currentColor;
      transition: box-shadow 0.1s ease-out; 
    }
  ` : `
    &:focus-visible {
      box-shadow: 0 0 0 5px currentColor;
      transition: box-shadow 0.1s ease-out; 
    }
  `
}
  
  ${props => props.prominence === "primary" && `
    background: var(--color-fg);
    color: var(--color-bg);
  `}
  ${props => props.prominence === "secondary" && `
    border: 1px solid var(--color-fg);
  `}
  ${props => props.prominence === "tertiary" && `
    padding-inline: 0;
  `}
  ${props => props.size === "large" && `
    font-size: var(--font-size-1);
    padding-block: 1rem;
  `}
  ${props => props.icon &&`
    width: 3rem;
    height: 3rem;
    padding: 0;
  `}
`

export default Button;
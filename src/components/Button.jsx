import styled from "styled-components";

const Button = styled.button.attrs(props => ({
  prominence: props.prominence || "primary",
  size: props.size || "medium"
}))`
  display: inline-flex;
  align-items: center;
  min-height: 3rem;
  padding-inline: 1.5rem;
  padding-block: 0.5rem;
  border-radius: 1.5rem;
  transition: outline 0.075s ease-out;

  &:focus {
    outline: 3px solid var(--color-fg);
  }
  
  ${props => props.prominence === "primary" && `
    background: var(color-fg);
    color: var(color-bg);
  `}
  ${props => props.prominence === "secondary" && `
    border: 1px solid var(color-fg);
  `}
  ${props => props.prominence === "tertiary" && `
    padding-inline: 0;
  `}
  ${props => props.size === "large" && `
    font-size: var(--text-size-1);
  `}
`

export default Button;
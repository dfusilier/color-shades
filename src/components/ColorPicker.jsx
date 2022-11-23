import styled from "styled-components";

const ColorPicker = styled.input.attrs(props => ({
    type: "color",
    style: {
        background: props.bg
    }
}))`
    flex-shrink: 0;
    border-radius: 100%;
    border: 3px solid var(--color-fg);
    width: 3.5rem;
    height: 3.5rem;
    margin-block: -0.25rem;
    transition: outline 0.075s ease-out; 

    &::-webkit-color-swatch {
        opacity: 0;
    }
    &::-moz-color-swatch {
        opacity: 0;
    }
    transition: box-shadow 0.075s ease-out;
    &:focus {
        outline: none; 
        box-shadow: 0 0 0 3px var(--color-fg);
        transition: box-shadow 0.1s ease-out; 
    }
`

export default ColorPicker;
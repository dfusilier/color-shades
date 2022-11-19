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

    &::-webkit-color-swatch {
        opacity: 0;
    }
    &::-moz-color-swatch {
        opacity: 0;
    }
`

export default ColorPicker;
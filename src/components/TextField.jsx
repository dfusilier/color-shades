import styled from "styled-components";

const TextField = styled.input.attrs(props => ({
    type: props.type || "text"
}))`
    background: var(--color-bg);
    color: var(--color-fg);
    border: 3px solid var(--color-fg);
    border-radius: 6px;
    height: 48px;
    padding: 8px 12px;
    font-size: inherit;
    line-height: inherit;
    width: 100%;
`

export default TextField;
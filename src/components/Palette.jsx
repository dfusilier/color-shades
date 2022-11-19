import styled from "styled-components";
import suggestTextColor from "../utils/suggestTextColor";

const Palette = styled.div`
    display: grid;
    width: 100%;
    grid-auto-rows: minmax(min-content, 1fr);
`;

Palette.Shade = styled.div.attrs(props => ({
    style: {
        background: props.bg,
        color: suggestTextColor(props.bg)
    }
}))`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    gap: 0.25rem;
    justify-content: space-between;
    align-items: center;
    padding-block: 8px;
    padding-inline: 20px;
    padding-inline: var(--box-padding-inline);
`;

export default Palette;
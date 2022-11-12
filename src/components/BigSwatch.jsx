import styled from "styled-components";
import Color from "colorjs.io";
import suggestTextColor from "../utils/suggestTextColor";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: ${({ backgroundColor }) => backgroundColor};
    color: ${({ textColor }) => textColor};
    border: 1px solid var(--color-fg);
    padding: 32px 48px;
    border-radius: 6px;
`

const BigSwatch = ({ colorStr, className, children }) => {
    const color = colorStr ? new Color(colorStr) : undefined;
    return(
        <Container className={className}
            backgroundColor={colorStr ? colorStr : "inherit"} 
            textColor={color ? suggestTextColor(colorStr) : "inherit"}>
                { children }
        </Container>
    );
};
    
export default BigSwatch;
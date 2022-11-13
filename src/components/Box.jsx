import styled from "styled-components";
import cssTheme from '../utils/makeTheme';

const Box = styled.div`
  ${({bg}) => bg ? cssTheme(bg) : ""}

  --box-padding-block: 24px;
  --box-padding-inline: 24px;

  border: 1px solid var(--color-fg);
  border-radius: 8px;

  @media (min-width: 768px) {
    --box-padding-block: 32px;
    --box-padding-inline: 32px;
  }
`
Box.Row = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(:last-child) {
    border-right: 1px solid var(--color-fg);
  }
`
Box.Column = styled.div`
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    border-bottom: 1px solid var(--color-fg);
  }
`
Box.ResponsiveRow = styled(Box.Column)`
  @media (min-width: 767px) {
    flex-direction: row;
    & > *:not(:last-child) {
        border-right: 1px solid var(--color-fg);
        border-bottom: 0px;
    }
  }
`
Box.Cell = styled.div`
  padding-block: var(--box-padding-block);
  padding-inline: var(--box-padding-inline);
`

export default Box;
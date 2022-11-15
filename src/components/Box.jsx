import styled from "styled-components";
import cssTheme from '../utils/makeTheme';

const Box = styled.div`
  ${({bg}) => bg ? cssTheme(bg) : ""}

  --box-padding-block: 24px;
  --box-padding-inline: 24px;

  width: 100%;
  position: relative;
  border: 1px solid var(--color-fg);
  border-radius: 8px;
  overflow: hidden;

  @media (min-width: 768px) {
    --box-padding-block: 32px;
    --box-padding-inline: 32px;
  }
`

Box.Cell = styled.div`
  position: relative;
  padding-block: var(--box-padding-block);
  padding-inline: var(--box-padding-inline);
`
Box.FloatingCell = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 0;
  right: 0;
  padding-block: 0;
  padding-inline: var(--box-padding-inline);
  border-bottom: none !important;
  height: 0;
`

Box.Row = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  & > * {
    &:not(:last-child) {
      border-right: 1px solid var(--color-fg);
    }
  }
`
Box.Column = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  & > * {
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-fg);
    }
  }
`

Box.GridColumn = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-row: minmax(min-content, 1fr);
  & > * {
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-fg);
    }
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


export default Box;
import styled from "styled-components";
import cssTheme from "../utils/makeTheme";
import * as RadixTabs from '@radix-ui/react-tabs';

const Tabs = { ...RadixTabs };

Tabs.Root = styled(RadixTabs.Root)`
  display: grid;
  width: 100%;
  grid-template-rows: auto 1fr;
`

Tabs.List = styled(RadixTabs.List)`
  // position: absolute;
  top: -1.25rem;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding-inline: 0;
  width: 100%;
`

Tabs.ContentWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
`

Tabs.Content = styled(RadixTabs.Content)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
  overflow-y: auto;
  &[data-state="active"] {
    z-index: 1;
  }
`

Tabs.Trigger = styled(RadixTabs.Trigger)`
  background: var(--color-bg);
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  border: 0;
  border: 1px solid var(--color-fg);
  min-height: 2rem;
  padding: 0px 8px;
  flex: 1 1 minmax(min-content, 1fr);
  width: 100%;
  transition: outline 0.075s ease-out, border-radius0.1s ease-out;
  outline: 0;
  margin: 0;
  display: block;
  cursor: pointer;
  appearance: none;

  &[data-state="active"] {
    ${cssTheme("white")}
    background: var(--color-bg);
    border: 1px solid var(--color-bg);
  }

  &:focus {
    outline: 3px solid var(--color-bg);
    border-radius: 4px;
    transition: outline 0.1s ease-out, border-radius0.1s ease-out; 
  }
`;


export default Tabs;
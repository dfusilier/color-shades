import styled from "styled-components";
import cssTheme from "../utils/makeTheme";
import * as RadixTabs from '@radix-ui/react-tabs';

const Tabs = { ...RadixTabs };

Tabs.Root = styled(RadixTabs.Root)`
  display: grid;
  position: relative;
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
  border-bottom: 1px solid var(--color-fg);
  & > *:not(:last-child) {
    border-right: 1px solid var(--color-fg);
  }
`
Tabs.Content = styled(RadixTabs.Content)`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 1fr;
  overflow-y: auto;
  &[data-state="active"] {
    z-index: 1;
  }
  &[data-state='inactive'] {
    display: none;
  }
  transition: box-shadow 0.075s ease-out;
  &:focus-visible {
      outline: none; 
      box-shadow: inset 0 0 0 3px var(--color-fg);
      transition: box-shadow 0.1s ease-out; 
  }
`

Tabs.Trigger = styled(RadixTabs.Trigger)`
  background: var(--color-bg);
  color: inherit;
  font-size: inherit;
  line-height: inherit;
  border: 0;
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
    z-index: 5;
  }

  transition: box-shadow 0.075s ease-out, border-radius 0.075s ease-out;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 5px var(--color-bg);
    transition: box-shadow 0.1s ease-out, border-radius 0.1s ease-out; 
    border-radius: 1px;
  }
`;


export default Tabs;
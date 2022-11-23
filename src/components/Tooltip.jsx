import styled from "styled-components";
import * as RadixTooltip from '@radix-ui/react-tooltip';

const Tooltip = { ...RadixTooltip };

Tooltip.Provider = styled(Tooltip.Provider).attrs(props => ({ 
  delayDuration: 0
}))``

Tooltip.Content = styled(Tooltip.Content)`
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: inherit;
  line-height: inherit;
  color: var(--color-bg);
  background-color: var(--color-fg);
  user-select: none;
  animation-duration: 150s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 5;
  box-shadow: hsl(206 22% 7% / 35%) 0px 5px 19px -5px, hsl(206 22% 7% / 20%) 0px 5px 10px -7.5px;
  transform-origin: var(--radix-tooltip-content-transform-origin);
  animation: slideUpAndFade 0.3s ease;

  &[data-state='delayed-open'][data-side='top'] {
    animation-name: slideUpAndFade;
  }
  &[data-state='delayed-open'][data-side='right'] {
    animation-name: slideRightAndFade;
  }
  &[data-state='delayed-open'][data-side='bottom'] {
    animation-name: slideDownAndFade;
  }
  &[data-state='delayed-open'][data-side='left'] {
    animation-name: slideLeftAndFade;
  }
` 
Tooltip.Arrow = styled(Tooltip.Arrow)`
  fill: var(--color-fg);
`

export default Tooltip;
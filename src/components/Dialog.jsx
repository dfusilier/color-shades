import styled from "styled-components";
import * as RadixDialog from '@radix-ui/react-dialog';
import Button from "./Button";
import Box from "./Box";

const Dialog = { ...RadixDialog };

Dialog.Overlay = styled(Dialog.Overlay).attrs(props => ({
  style: {
    background: props.bg || "rgba(10, 10, 10, 0.9)"
  }
}))`
  position: fixed;
  z-index: 1000;
  inset: 0;
  animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
Dialog.Content = styled(Dialog.Content)`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`
Dialog.Footer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(min-content, 1fr);
  
  ${props => props.responsive && styled.css`
    grid-auto-flow: row;
    grid-auto-rows: minmax(min-content, 1fr);

    @media (max-width: 767px) {
      grid-auto-flow: row;
      grid-auto-rows: minmax(min-content, 1fr);
    }
  `}
`
Dialog.DismissingAction = styled(Button).attrs(props => ({
  prominence: "tertiary",
  size: "large",
  focusType: "interior"
}))`
  padding-inline: var(--box-padding-inline);
  border-radius: 0;
`
Dialog.ConfirmingAction = styled(Button).attrs(props => ({
  prominence: "primary",
  size: "large",
  focusType: "interior"
}))`
  padding-inline: var(--box-padding-inline);
  border-radius: 0;
`
Dialog.Header = styled(Box.Cell)`
  --box-padding-block: 1rem;
`
Dialog.Body = styled(Box.Cell)`
  --box-padding-block: 2rem;
  display: grid;
  grid-template-rows: auto auto;
  gap: 2rem;
  padding-block-end: calc(var(--box-padding-block) + 0.25rem);
`

export default Dialog;
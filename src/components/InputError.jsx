
import styled from 'styled-components';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Container = styled.span`
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.375rem;
  background: var(--color-fg);
  padding-block: 0.5rem;
  padding-inline-start: 0.65rem;
  padding-inline-end: 1rem;
  position: absolute;
  z-index: 5;
  top: calc(100% + 0.75rem);
  left: 0;
  border-radius: 0.375rem;
  width: auto;
  max-width: 100%;
  box-shadow: hsl(206 22% 7% / 35%) 0px 5px 19px -5px, hsl(206 22% 7% / 20%) 0px 5px 10px -7.5px;
  &:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    top: -0.375rem;
    border-left: 0.65rem solid transparent;
    border-right: 0.65rem solid transparent;
    border-bottom: 0.75rem solid white;
  }
`;

const IconWrapper = styled.span`
  color: var(--color-fg-negative);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputError = ({ children, ...otherProps }) => 
  <Container {...otherProps}>
    <IconWrapper className="color-fg-negative">
      <ExclamationCircleIcon className="h-2 w-2" />
    </IconWrapper>
    { children }
  </Container> 

export default InputError;
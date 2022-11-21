import styled from "styled-components";

const Section = styled.section`
  padding-block: 12px;
  padding-inline: 24px;
  margin: auto;
  max-width: 864px;

  &:first-child { padding-block-start: 24px; }
  &:last-child { padding-block-end: 24px; }

  @media (min-width: 768px) {
    padding-block: 12px;
    padding-inline: 48px;

    &:first-child { padding-block-start: 48px; }
    &:last-child { padding-block-end: 48px; }
  }
`

export default Section;
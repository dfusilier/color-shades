import styled from "styled-components";

const Section = styled.section`
  box-sizing: border-box;
  margin: auto;
  max-width: 864px;

  &:not(:first-child) {
    margin-block-start: 1.5rem;
    @media (min-width: 768px) {
      margin-block-start: 3rem;
    }
  }
  
`

export default Section;
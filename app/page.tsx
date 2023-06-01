'use client';

import styled from "styled-components"

const Home = () => {
  return (
    <Wrapper >
        <HeadWrapper>Share and Shine in Descriptive Writing
            <br />
            <Span>Descriptive Quotes</Span>
        </HeadWrapper>
        <Paragraph>
            This is a descriptive scenes gallery where you can sumbit the amazing descriptive and imagery 
            expressions you've found in your reading and share with other students.
        </Paragraph>
    
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`
const HeadWrapper = styled.h1`
  margin-top: 1.25rem; 
  font-size: 3.75rem; 
  font-weight: 800;
  line-height: 1.15;
  color: #000000;
  text-align: center;
  @media (min-width: 640px) {  
    font-size: 4rem;   
}
`

const Span = styled.span`
  text-align: center;
  background-image: linear-gradient(to right, #FFBF00, #FF8000, #FFFF00);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

`

const Paragraph = styled.p`
  margin-top: 1.25rem; 
  font-size: 1.125rem; 
  color: #6B7280;
  max-width: 36rem; 
  text-align: center;


@media (min-width: 640px) { 
    font-size: 1.25rem;   
}
`
export default Home
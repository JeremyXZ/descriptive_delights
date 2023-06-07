"use client";
import QuotesDisplay from "@/components/Quotes";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <HeadWrapper>
        Collect and Share
        <LineBreak />
        <Span>Descriptive Quotes</Span>
      </HeadWrapper>
      <Paragraph>
        This is a quote gallery where you can sumbit the amazing descriptive and
        imagery expressions you've found in your reading and share them with
        other students.
      </Paragraph>
      <QuotesDisplay />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
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
`;
const LineBreak = styled.div`
  &::before {
    content: " ";
    white-space: pre-line;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Span = styled.span`
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

const Paragraph = styled.p`
  margin-top: 1.25rem;
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 36rem;
  text-align: center;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;
export default Home;

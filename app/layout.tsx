"use client"
import React, {ReactNode} from "react";
import styled from 'styled-components';
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const matadata= {
    title: "Descriptive Delights",
    description: "Share descriptive quotes and shine in descriptive writing"
}

interface Props {
    children: React.ReactNode;
  }
const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <html lang='en'>
        <body>
            <>
                <MainWrapper>
                    <GradientWrapper>

                    </GradientWrapper>
                </MainWrapper>
                <AppWrapper>
                    <Nav />
                    {children}
                </AppWrapper>
            </>
        </body>
    </html>
  )
}


const MainWrapper = styled.div`
    
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 120px 24px 160px 24px;
  pointer-events: none;


&:before {
  background: radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%);
  position: absolute;
  content: "";
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
}

&:after {
  content: "";
  background-image: url("/assets/images/grid.svg");
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0.4;
  filter: invert(1);
}
`

const GradientWrapper = styled.div`
    height: fit-content;
    z-index: 3;
    width: 100%;
    max-width: 640px;
    background-image: radial-gradient(
      at 27% 37%,
      hsla(215, 98%, 61%, 1) 0px,
      transparent 0%
    ),
    radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
    radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
    radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
    radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
    radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
    radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%);
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    filter: blur(100px) saturate(150%);
    top: 80px;
    opacity: 0.15;

`
const AppWrapper = styled.main`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 7xl;
  margin-left: auto;
  margin-right: auto;
  padding-left: 6px;
  padding-right: 6px;
  @media (min-width: 640px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`


export default RootLayout 
export {matadata}

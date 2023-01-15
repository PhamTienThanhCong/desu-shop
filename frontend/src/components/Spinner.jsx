import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(255, 255, 255, 0.5);
z-index: 9999;
display: flex;
align-items: center;
justify-content: center;
`;


const rolate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerSize = styled.div` 
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
  `
  const Circle = styled.div` 
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 90px;
    height: 90px;
    margin: 10px;
    border: 6px solid #7a7878;
    border-radius: 50%;
    animation: ${rolate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #7a7878 transparent transparent transparent;
  `
  
const Spinner = () => {
    return (
        <Container>
            <SpinnerSize>
                <Circle />
            </SpinnerSize>
        </Container>
    );
};

export default Spinner;

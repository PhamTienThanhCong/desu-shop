import React from 'react';
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { sliderItem } from '../data';
import { mobile } from "../responsive";
const Image = styled.img`
  height: 220px;
  width: 100%;
  border-radius: 12px;

  ${mobile({ height: '110px'})}
`;
const Wrapper = styled.div`
  height: 220px;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  ${mobile({ height: '110px', gap: '5px' })}
`;
const ImgContainer = styled.div`
  padding: 2px;
  // border: 1px solid black;
`;

const Slider = () => {
  return (
    <Carousel
      duration={3000}
      animation='slide'
      indicators={false}
      showArrows={true}
    >
      {sliderItem.map((item, i) =>
        item ? (
          <div key={i}>
            <Wrapper>
              <ImgContainer>
                <Link to={`/products/${item[0]?.cat}`}>
                  <Image src={item[0]?.img} />
                </Link>
              </ImgContainer>
              <ImgContainer>
                <Link to={`/products/${item[1]?.cat}`}>
                  <Image src={item[1]?.img} />
                </Link>
              </ImgContainer>
            </Wrapper>
          </div>
        ) : null
      )}
    </Carousel>
  );
};

export default Slider;

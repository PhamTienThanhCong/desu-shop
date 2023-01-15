import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  // transition: all 300ms ease-in-out;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 10px;
  z-index: 5;
  width: 100%;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 20px;
  margin: 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 20px;
  margin: 0;
`;

const Container = styled.div`
  border-radius: 10px;
  display: flex;
  flex: 0 5 19%;
  height: 350px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  position: relative;
  flex-direction: column;
  margin: 7px 0;
  &:hover ${Info} {
    opacity: 1;
  }
  &:hover {
    transform: translateY(-20px);
  }
 
  ${mobile({maxWidth: '340px', minWidth: '270px'})}
`;

const Image = styled.img`
  z-index: 2;
  height: 250px;
  width: 200px;
  object-fit: contain;
  ${mobile({
    maxWidth: '340px',
    minWidth: '270px',
  })}
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <>
        {/* <Circle /> */}
        <Image src={item.image} />
        <Info>
          <Icon>
            <ShoppingCartIcon />
          </Icon>
          <Icon>
            <Link to={`/product/${item.id}`}>
              <SearchIcon />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderIcon />
          </Icon>
        </Info>
      </>
      <InfoContainer>
        <Title>{item.name}</Title>
        <Price>$ {item.price}</Price>
      </InfoContainer>
    </Container>
  );
};

export default Product;

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { addProductToCart } from '../redux/apiRequest';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: scale-down;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.login.currentUser);
  const userId= user?._id;


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (!user) {
      alert('Please login to add product to cart')
      return;
    }
    const productId = product.id;
    addProductToCart({quantity, productId, userId, dispatch} )
    dispatch(
      addProduct({ ...product, quantity })
      );
      console.log(product, user)
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
        <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            {
              user ? <Button onClick={handleClick}>ADD TO CART</Button> : <Link to="/login"><Button>LOGIN TO ADD</Button></Link>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
   
    </Container>
  );
};

export default Product;

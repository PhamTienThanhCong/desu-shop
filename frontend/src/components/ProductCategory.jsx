import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Product from './Product';
import { Link } from 'react-router-dom';
import { mobile, screen12 } from '../responsive';
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;
const CategoryWarpper = styled.div`
  display: relative;
  flex-direction: column;
  // background-color: #092dc6;
  margin-bottom: 30px;
  border-radius: 14px;
  flex: 1;
  background: url(//cdn.tgdd.vn/mwgcart/mwg-site/ContentMwg/images/newyear2023/Background/xu-huong-mua-sam.png);
  background-size: 100% 100%;
  padding: 20px;
  
  ${mobile({
    backgroundColor: '#D60208;',
    backgroundImage: 'none',
    maxWidth: '380px',
    minWidth: '310px',
  })}
}
`;
const ListProduct = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  flex: 0 1 21%;
  gap: 1%;
  ${mobile({ flexDirection: 'column' })}
  ${screen12({ flexWrap: 'wrap' })}
`;

const Title = styled.div`
  margin: 0 20px;
  padding: 20px 0;
  pointer-events: none;
  overflow: hidden;
  color: #fff;
  font-weight: 700;
  font-size: 45px;
  line-height: 40px;
  letter-spacing: 2px;
  background-image: url(//cdn.tgdd.vn/mwgcart/mwg-site/ContentMwg/images/newyear2023/Background/bg-tuan-le-top.png),
    url(//cdn.tgdd.vn/mwgcart/mwg-site/ContentMwg/images/newyear2023/Background/bg-tuan-le-top-right2.png);
  background-size: 129px 53px;
  background-repeat: no-repeat;
  background-position: left, right;
`;

const StyledLink = styled(Link)`
  background-color: #fff;
  text-align: center;
  color: #000;
  text-decoration: none !important;
  padding: 10px;
  width: 370px;
  display: inline-block;
  overflow: hidden;
  border-radius: 4px;
  text-align: center;
  padding: 12px;
  margin: 15px auto 15px;
  ${mobile({ width: '200px' })}
`;
const ProductCategory = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/v1/product');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {}
  };

  const getCategory = async () => {
    try {
      setLoading(true);
      const resCat = await axios.get('http://localhost:8000/v1/category');
      setCategory(resCat.data);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    getCategory();
    getProducts();
    console.log(category);
    console.log(products);
  }, []);

  const handlerArrays = (catInput) => {
    let arrayOfArrays = [];
    const chunkSize = 5;
    arrayOfArrays = products.filter(
      (item) =>
        item.category === category.find((cat) => cat.name === catInput)?.id
    );
    return arrayOfArrays;
  };
  return (
    <Container>
      <CategoryWarpper>
        <Title>Laptop</Title>
        <ListProduct>
          {handlerArrays('laptop')
            .slice(0, 5)
            .map((item) => (
              <Product item={item} key={item.id} />
            ))}
        </ListProduct>
        <StyledLink to={'/products/laptop'}>Xem tất cả sản phẩm</StyledLink>
      </CategoryWarpper>

      <CategoryWarpper>
        <Title>Smartphone</Title>
        <ListProduct>
          {handlerArrays('smartphone')
            .slice(0, 5)
            .map((item) => (
              <Product item={item} key={item.id} />
            ))}
        </ListProduct>

        <StyledLink to={'/products/smartphone'}>Xem tất cả sản phẩm</StyledLink>
      </CategoryWarpper>

      <CategoryWarpper>
        <Title>Smart Watch</Title>
        <ListProduct>
          {handlerArrays('watch')
            .slice(0, 5)
            .map((item) => (
              <Product item={item} key={item.id} />
            ))}
        </ListProduct>

        <StyledLink to={'/products/smartwatch'}>Xem tất cả sản phẩm</StyledLink>
      </CategoryWarpper>
    </Container>
  );
};

export default ProductCategory;

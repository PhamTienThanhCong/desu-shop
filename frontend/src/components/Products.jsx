import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from './Product';
import Spinner from './Spinner';
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #f5fbfd;
  gap: 1%;
`;

const Products = ({ cat, filters, sort, search }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(cat);
    console.log(search);
    const getProducts = async () => {
      try {
        setLoading(true);
        let url = '';
        if (cat) {
          url = `http://localhost:8000/v1/product?category=${cat}`;
        } else if (search) {
          url = `http://localhost:8000/v1/product${search}`;
        } else {
          url = 'http://localhost:8000/v1/product';
        }
        console.log(url);
        const res = await axios.get(url);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {}
    };
    getProducts();
  }, [cat, search]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    console.log(filteredProducts.length, products.length);
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      {filteredProducts.length != 0 || products.length != 0 ? (
        cat ? (
          filteredProducts.map((item) => <Product item={item} key={item.id} />)
        ) : (
          products.map((item) => <Product item={item} key={item.id} />)
        )
      ) : (
        <div style={{ fontWeight: 'bold' }}>
          No products were found that met the criteria!
        </div>
      )}
    </Container>
  );
};

export default Products;

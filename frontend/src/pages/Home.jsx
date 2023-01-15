
import React from "react";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import ProductCategory from '../components/ProductCategory';

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <ProductCategory />
      <Newsletter />
    </div>
  );
};

export default Home;

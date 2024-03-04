import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <MainSlider />
        <CategoriesSlider />
        <Products />
      </HelmetProvider>
    </>
  );
};

export default Home;

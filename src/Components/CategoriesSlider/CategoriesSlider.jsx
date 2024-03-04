import React, { useContext, useState } from "react";
import style from "./CategoriesSlider.module.css";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../Context/CategoryContext";

const CategoriesSlider = () => {
  const { setCategoryName } = useContext(CategoryContext);
  const [isError, setIsError] = useState(null);
  const { data, isLoading } = useQuery("CategoriesSlider", getCategories, {
    onError: (error) => {
      setIsError(error.response?.data?.message || "An error occurred.");
    },
    enabled: !isError,
  });
  async function getCategories() {
    setIsError(null);
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const handleCategoryClick = (categoryName) => {
    setCategoryName(categoryName);
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 7,
    slidesToScroll: 2,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <section className="pt-5 categories-slider">
      <Container>
        {isLoading && <Loading />}
        {isError && <div className="alert alert-danger">{isError}</div>}
        {data?.data?.data.length > 0 && (
          <Slider {...settings} className={`${style.categoriesSlider}`}>
            {data.data.data.map((category) => (
              <div className={`${style.categoryItem}`} key={category._id}>
                <Link
                  to={`/categories/subcategories/${category._id}`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <figure>
                    <img src={category.image} className="w-100" alt="" />
                  </figure>
                  <h5 className="text-center">{category.name}</h5>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </Container>
    </section>
  );
};

export default CategoriesSlider;

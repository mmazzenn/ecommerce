import React, { useContext, useState } from "react";
import style from "./Categories.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LinksList from "../LinksList/LinksList";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../Context/CategoryContext";

const Categories = () => {
  const { setCategoryName } = useContext(CategoryContext);
  const [isError, setIsError] = useState(null);
  const { data, isLoading } = useQuery("Categories", getCategories, {
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

  return (
    <HelmetProvider>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <section className="categories py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {data?.data?.data.length > 0 && (
            <Row className="gy-4 gx-3">
              <Col sm={12}>
                <LinksList
                  links={[{ keys: "Home", values: "/home" }]}
                  activeLink={[{ keys: "Categories", values: "/categories" }]}
                  afterActiveLinks={[
                    {
                      keys: "Sub categories",
                      values: "/categories/subcategories",
                    },
                  ]}
                />
              </Col>
              {data.data.data.map((category) => (
                <Col key={category._id} xl={3} md={4} sm={6}>
                  <div className={`${style.categoryItem}`}>
                    <Link
                      onClick={() => handleCategoryClick(category.name)}
                      to={`/categories/subcategories/${category._id}`}
                    >
                      <figure>
                        <img src={category.image} className="w-100" alt="" />
                      </figure>
                      <h5 className="text-center text-main fw-bold">
                        {category.name}
                      </h5>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default Categories;

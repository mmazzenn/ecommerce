import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Loading from "../Loading/Loading";
import LinksList from "../LinksList/LinksList";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SubCategoryContext } from "../../Context/SubCategoryContext";

const SubCategories = () => {
  const { setSubCategoryName } = useContext(SubCategoryContext);
  const [isError, setIsError] = useState(null);
  const { data, isLoading } = useQuery("SubCategories", getSubCategories, {
    onError: (error) => {
      setIsError(error.response?.data?.message || "An error occurred.");
    },
    enabled: !isError,
  });
  async function getSubCategories() {
    setIsError(null);
    return await axios.get(
      "https://ecommerce.routemisr.com/api/v1/subcategories"
    );
  }
  const handleSubCategoryClick = (subCategoryName) => {
    setSubCategoryName(subCategoryName);
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>SubCategories</title>
      </Helmet>
      <section className="sub-categories py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {data?.data?.data.length > 0 && (
            <Row className="gy-4">
              <Col sm={12}>
                <LinksList
                  links={[
                    { keys: "Home", values: "/home" },
                    { keys: "Categories", values: "/categories" },
                  ]}
                  activeLink={[
                    {
                      keys: "Sub categories",
                      values: "/categories/subcategories",
                    },
                  ]}
                />
              </Col>
              {data.data.data.map((subcategory) => (
                <Col key={subcategory._id} lg={3} md={4} sm={6}>
                  <Link
                    onClick={() => handleSubCategoryClick(subcategory.name)}
                    to={`/categories/subcategories/products/${subcategory._id}`}
                    className="bg-light d-block py-3 rounded-pill"
                  >
                    <h5 className="text-center text-main fw-bold mb-0">
                      {subcategory.name}
                    </h5>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default SubCategories;

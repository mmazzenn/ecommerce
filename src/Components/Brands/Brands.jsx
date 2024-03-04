import style from "./Brands.module.css";

import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LinksList from "../LinksList/LinksList";
import { Link } from "react-router-dom";
import { BrandContext } from "../../Context/BrandContext";

const Brands = () => {
  const { setBrandName } = useContext(BrandContext);
  const [isError, setIsError] = useState(null);
  const { data, isLoading } = useQuery("Brand", getBrands, {
    onError: (error) => {
      setIsError(error.response?.data?.message || "An error occurred.");
    },
    enabled: !isError,
  });

  async function getBrands() {
    setIsError(null);
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const handleBrandClick = (brandName) => {
    setBrandName(brandName);
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <section className="brands py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {data?.data?.data.length > 0 && (
            <Row className="gy-4 gx-3">
              <Col sm={12}>
                <LinksList
                  links={[{ keys: "Home", values: "/home" }]}
                  activeLink={[{ keys: "Brands", values: "/brands" }]}
                />
              </Col>
              {data.data.data.map((brand) => (
                <Col key={brand._id} xl={3} md={4} sm={6}>
                  <div className={`${style.brandItem}`}>
                    <Link
                      onClick={() => handleBrandClick(brand.name)}
                      to={`/brands/products/${brand._id}`}
                    >
                      <figure>
                        <img src={brand.image} className="w-100" alt="" />
                      </figure>
                      <h5 className="text-center text-main fw-bold">
                        {brand.name}
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

export default Brands;

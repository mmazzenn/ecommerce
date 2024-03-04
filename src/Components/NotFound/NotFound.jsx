import React from "react";
import { Container } from "react-bootstrap";
import notFoundImg from "../../assets/images/error.svg";
import { Helmet, HelmetProvider } from "react-helmet-async";

const NotFound = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Container className="my-4 text-center">
        <img src={notFoundImg} className="w-75" alt="" />
      </Container>
    </HelmetProvider>
  );
};

export default NotFound;

import React from "react";
import style from "./Footer.module.css";
import { Col, Container, Form, Row } from "react-bootstrap";

const Footer = () => {
  const paymentImages = require.context("../../assets/images/payment");
  const paymentImagesList = paymentImages
    .keys()
    .map((img) => paymentImages(img));
  return (
    <footer className={`bg-main-light py-5`}>
      <Container fluid="sm">
        <h2>Get the FreshCart app</h2>
        <p>
          We will send you a link, open it on your phone to download the app.
        </p>
        <Row className={`${style.line} pb-5`}>
          <Col xl={10} md={8} className="mb-md-0 mb-4">
            <Form.Group>
              <Form.Control
                className="py-2"
                placeholder="Email .."
                type="email"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xl={2} md={4}>
            <button className="btn bg-main text-white fw-semibold w-100 py-2">
              Share App Link
            </button>
          </Col>
        </Row>
        <Row className={`${style.line} py-3`}>
          <Col xl={6}>
            <div
              className={`${style.partners} d-flex align-items-center gap-3 flex-wrap`}
            >
              <h5>Payment Partners</h5>
              <img src={paymentImagesList[0]} alt="" />
              <img src={paymentImagesList[1]} alt="" />
              <img src={paymentImagesList[2]} alt="" />
              <img src={paymentImagesList[3]} alt="" />
            </div>
          </Col>
          <Col xl={6}>
            <div
              className={`${style.deliveries} d-flex align-items-center h-100 gap-3 flex-wrap`}
            >
              <h5 className=" mb-1">Get deliveries with FreshCart</h5>
              <img src={paymentImagesList[4]} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

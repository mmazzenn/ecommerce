import React from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "react-bootstrap";
import style from "./MainSlider.module.css";

const MainSlider = () => {
  const images = require.context("../../assets/images/mainSlider", true);
  const imageList = images.keys().map((image) => images(image));
  const promoImages = require.context("../../assets/images/promo", true);
  const promoImageList = promoImages.keys().map((image) => promoImages(image));
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    focusOnSelect: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <section className="main-slider pt-5">
        <Container>
          <Row className="g-0">
            <Col md={8}>
              <Slider {...settings} className={`${style.mainSlider}`}>
                {imageList.map((img, index) => (
                  <figure key={index} className="mb-0 mb-md-1">
                    <img
                      src={img}
                      alt={`Slider ${index + 1}`}
                      className="w-100"
                    />
                  </figure>
                ))}
              </Slider>
            </Col>
            <Col md={4} className={`${style.rightImgs}`}>
              <figure className="mb-0">
                <img src={promoImageList[0]} alt="Promo 1" className="w-100" />
              </figure>
              <figure className="mb-0">
                <img src={promoImageList[1]} alt="Promo 2" className="w-100" />
              </figure>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MainSlider;

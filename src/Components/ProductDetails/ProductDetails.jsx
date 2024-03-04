import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import ProductPriceRating from "../ProductPriceRating/ProductPriceRating";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Slider from "react-slick";
import LinksList from "../LinksList/LinksList";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { WishlistContext } from "../../Context/WishlistContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [title, setTitle] = useState("");
  const { productId } = useParams();
  const { addWishlist, getWishlist, removeWishlist } =
    useContext(WishlistContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  async function handelCart(productId) {
    const resStatus = await addToCart(productId);
    if (resStatus.status === "success") {
      toast.success(resStatus.message, {
        autoClose: 2000,
        position: "bottom-right",
      });
    } else {
      toast.error("Oops, something bad happened", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  }
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

  async function addToWishlist(productId) {
    try {
      const { data } = await addWishlist(productId);
      if (data.status === "success") {
        setWishlistProducts(data?.data);
        toast.success(data.message, {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Oops, something bad happened", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  }
  async function removeFromWishlist(productId) {
    try {
      const { data } = await removeWishlist(productId);
      if (data.status === "success") {
        setWishlistProducts(data?.data);
        toast.success(data.message, {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Oops, something bad happened", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  }
  async function getAllWishlish() {
    try {
      const { data } = await getWishlist();
      if (data?.data.length > 0) {
        const newWishlistProducts = data.data.map((item) => item.id);
        setWishlistProducts((prevWishlistProducts) => [
          ...prevWishlistProducts,
          ...newWishlistProducts,
        ]);
      }
      setIsError(false);
    } catch (error) {
      setIsError(error.response?.data?.message || "An error occurred.");
    }
  }

  async function getProductDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setIsError(null);
      setProductDetails(data.data);
      setIsLoading(false);
      Object.keys(data.data).length > 0 && setTitle(data.data.title);
    } catch (error) {
      setIsError("Ops product not found");
      setProductDetails([]);
      setIsLoading(false);
      setTitle("Not Found");
    }
  }
  useEffect(() => {
    getProductDetails();
    getAllWishlish();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        {Object.keys(productDetails).length > 0}
        <title>{title}</title>
        {Object.keys(productDetails).length > 0 && (
          <meta name="keywords" content={productDetails.slug} />
        )}
      </Helmet>
      <section className="py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {Object.keys(productDetails).length > 0 && (
            <Row className="gy-4 align-items-center">
              <Col sm={12}>
                <LinksList
                  links={[
                    { keys: "Home", values: "/home" },
                    { keys: "Products", values: "/products" },
                  ]}
                  activeLink={[
                    {
                      keys: productDetails.title
                        .split(" ")
                        .slice(0, 3)
                        .join(" "),
                      values: `/products/${productId}`,
                    },
                  ]}
                />
              </Col>
              <Col lg={4}>
                {productDetails.images.length > 0 ? (
                  <Slider {...settings} className={`${style.detailsSlider}`}>
                    {productDetails.images.map((img, index) => (
                      <figure
                        key={index}
                        className={`${style.productImg} h-100`}
                      >
                        <img
                          src={img}
                          alt={`Slider ${index + 1}`}
                          className="w-100"
                        />
                      </figure>
                    ))}
                  </Slider>
                ) : (
                  <figure className={`${style.productImg} h-100`}>
                    <img
                      src={productDetails.imageCover}
                      alt={productDetails.title}
                      className="w-100 h-100"
                    />
                  </figure>
                )}
              </Col>
              <Col lg={8}>
                <h3 className={`${style.productTitle} fw-bold`}>
                  {productDetails.title}
                </h3>
                <p className={`${style.productDescription} text-muted`}>
                  {productDetails.description}
                </p>
                <h4 className="mb-3 text-main fw-bold d-flex justify-content-between align-items-center">
                  <span>{productDetails.category.name}</span>
                  <span>{productDetails.brand.name}</span>
                </h4>
                <ProductPriceRating
                  price={productDetails.price}
                  rating={productDetails.ratingsAverage}
                  discount={
                    productDetails.priceAfterDiscount
                      ? productDetails.priceAfterDiscount
                      : null
                  }
                />
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => handelCart(productDetails.id)}
                    className="btn bg-main text-white w-75 mt-3"
                  >
                    Add to cart
                  </button>
                  {wishlistProducts.includes(productDetails.id) ? (
                    <button
                      onClick={() => removeFromWishlist(productDetails.id)}
                      className={`${style.wishlistBtn} btn p-0 mt-2`}
                    >
                      <i className="fa-solid fa-heart fa-2x text-danger"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToWishlist(productDetails.id)}
                      className={`${style.wishlistBtn} btn p-0 mt-2`}
                    >
                      <i className="fa-regular fa-heart fa-2x text-danger"></i>
                    </button>
                  )}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default ProductDetails;

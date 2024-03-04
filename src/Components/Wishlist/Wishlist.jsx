import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import ProductPriceRating from "../ProductPriceRating/ProductPriceRating";
import { toast } from "react-toastify";
import { CartContext } from "../../Context/CartContext";

const Wishlist = () => {
  const { getWishlist, removeWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handelCart(productId) {
    const resStatus = await addToCart(productId);
    if (resStatus.status === "success") {
      removeFromWishlist(productId);
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
  async function removeFromWishlist(productId) {
    try {
      const { data } = await removeWishlist(productId);
      if (data.status === "success") {
        getAllWishlish();
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
        setWishlistProducts(data.data);
      } else {
        setWishlistProducts([]);
      }
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsError(error.response?.data?.message || "An error occurred.");
      setWishlistProducts([]);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllWishlish();
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <section className="py-5 products">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {wishlistProducts.length > 0 && (
            <Row className="gy-4 gx-3">
              {wishlistProducts.map((product) => (
                <Col xl={3} md={4} sm={6} key={product.id}>
                  <div className="product h-100">
                    <Link to={"/products/" + product.id}>
                      <img
                        src={product.imageCover}
                        className="w-100 mb-3"
                        alt={product.title}
                      />
                      <h3 className="text-main h6 fw-bold">
                        {product.categoryName}
                      </h3>
                      <h4 className={`${style.productTitle} h6 fw-bold`}>
                        {product.title}
                      </h4>
                      <ProductPriceRating
                        price={product.price}
                        rating={product.ratingsAverage}
                      />
                    </Link>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => handelCart(product.id)}
                        className="btn bg-main text-white w-75 mt-2"
                      >
                        Add to cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className={`${style.wishlistBtn} btn p-0 mt-2`}
                      >
                        <i className="fa-solid fa-heart fa-2x text-danger"></i>
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
          {wishlistProducts.length === 0 && isLoading === false ? (
            <div className="bg-body-secondary fw-bold text-center p-4 rounded-3 fs-3">
              You don't have any wishlist products
            </div>
          ) : null}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default Wishlist;

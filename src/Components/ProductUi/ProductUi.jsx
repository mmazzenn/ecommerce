import React, { useContext, useEffect, useState } from "react";
import style from "./ProductUi.module.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPriceRating from "../ProductPriceRating/ProductPriceRating";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { WishlistContext } from "../../Context/WishlistContext";

const ProductUi = ({ product }) => {
  const [currentProduct] = useState(product);
  const { addToCart } = useContext(CartContext);
  const { addWishlist, getWishlist, removeWishlist } =
    useContext(WishlistContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isError, setIsError] = useState(null);
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
  useEffect(() => {
    getAllWishlish();
  }, []);
  return (
    <>
      {isError && <div className="alert alert-danger">{isError}</div>}
      <Col xl={3} md={4} sm={6}>
        <div className="product h-100">
          <Link to={"/products/" + currentProduct.id}>
            <img
              src={currentProduct.img}
              className="w-100 mb-3"
              alt={currentProduct.title}
            />
            <h3 className="text-main h6 fw-bold">
              {currentProduct.categoryName}
            </h3>
            <h4 className={`${style.productTitle} h6 fw-bold`}>
              {currentProduct.title.split(" ").slice(0, 3).join(" ")}
            </h4>
            <ProductPriceRating
              price={currentProduct.price}
              rating={currentProduct.rating}
            />
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={() => handelCart(currentProduct.id)}
              className="btn bg-main text-white w-75 mt-2"
            >
              Add to cart
            </button>
            {wishlistProducts.includes(currentProduct.id) ? (
              <button
                onClick={() => removeFromWishlist(currentProduct.id)}
                className={`${style.wishlistBtn} btn p-0 mt-2`}
              >
                <i className="fa-solid fa-heart fa-2x text-danger"></i>
              </button>
            ) : (
              <button
                onClick={() => addToWishlist(currentProduct.id)}
                className={`${style.wishlistBtn} btn p-0 mt-2`}
              >
                <i className="fa-regular fa-heart fa-2x text-danger"></i>
              </button>
            )}
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductUi;

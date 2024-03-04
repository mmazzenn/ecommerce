import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Cart = () => {
  const {
    getCart,
    cartItemsNumber,
    removeFromCart,
    clearCart,
    updateProductQty,
  } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [disabledBtns, setDisabledBtns] = useState([]);
  const [clearBtn, setClearBtn] = useState(false);
  const [isError, setIsError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  async function getCartItems() {
    setIsLoading(true);
    setCartItems([]);
    try {
      const { data } = await getCart();
      setIsError(null);
      data ? setCartItems(data) : setCartItems({ products: [] });
      setIsLoading(false);
    } catch (error) {
      setCartItems({ products: [] });
      setIsLoading(false);
    }
  }

  async function updateProductCount(id, count) {
    if (count === 0) {
      await removeCartItem(id);
    } else {
      try {
        const data = await updateProductQty(id, count);
        if (data.status === "success") {
          setCartItems(data?.data);
        }
      } catch (error) {
        toast.error("Oops, something bad happened", {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    }
  }

  async function removeCartItem(id) {
    try {
      setDisabledBtns([...disabledBtns, id]);
      const data = await removeFromCart(id);
      if (data.status === "success") {
        setCartItems(data?.data);
        toast.success("Product removed from your cart successfully", {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      setDisabledBtns(disabledBtns.filter((btnId) => btnId !== id));
      toast.error("Oops, something bad happened", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  }

  async function clearCartItems() {
    setClearBtn(true);
    try {
      const data = await clearCart();
      if (data.message === "success") {
        setCartItems({ products: [] });
        toast.success("Cart removed successfully", {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      setClearBtn(false);
      toast.error("Oops, something bad happened", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  }
  useEffect(() => {
    getCartItems();
  }, [cartItemsNumber]);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <section className="cart py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {cartItems?.products?.length > 0 && (
            <div className="cartItems p-md-5 p-3 rounded-3">
              <div className="cart-info">
                <button
                  className="btn btn-danger w-75 mx-auto py-2 d-block fw-bold"
                  onClick={() => clearCartItems()}
                  disabled={clearBtn}
                >
                  Clear cart
                </button>
                <div
                  className={`${style.totalDetails} d-flex justify-content-between align-items-center py-3 my-4 px-4 rounded-2 flex-wrap`}
                >
                  <h3 className="total-price fw-bold">
                    Total Price:
                    <span className="text-main ms-2">
                      {cartItems.totalCartPrice}
                    </span>
                  </h3>
                  <h3 className="total-items fw-bold">
                    Total Items:
                    <span className="text-main ms-2">{cartItemsNumber}</span>
                  </h3>
                </div>
              </div>
              {cartItems?.products?.map((product) => (
                <div
                  className={`${style.cartItem} p-3 mb-4 rounded-2`}
                  key={product.product.id}
                >
                  <Row className="align-items-center gy-3">
                    <Col md={2}>
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className={`${style.productImg} w-100 rounded-2`}
                      />
                    </Col>
                    <Col md={7}>
                      <h4 className="mb-3 fw-bold text-center text-md-start">
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </h4>
                      <h5 className="h4 fw-bold text-center text-md-start mb-0 text-main">
                        {product.price} EGP
                      </h5>
                    </Col>
                    <Col
                      md={3}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <button
                        onClick={() =>
                          updateProductCount(
                            product.product.id,
                            product.count + 1
                          )
                        }
                        className={`${style.countBtn} btn btn-success fs-3 fw-bold rounded-circle d-flex justify-content-center align-items-center`}
                      >
                        +
                      </button>
                      <h3 className="mx-3 fw-bold">{product.count}</h3>
                      <button
                        onClick={() =>
                          updateProductCount(
                            product.product.id,
                            product.count - 1
                          )
                        }
                        className={`${style.countBtn} btn btn-success fs-3 fw-bold rounded-circle d-flex justify-content-center align-items-center`}
                      >
                        -
                      </button>
                    </Col>
                    <Col md={6} className="d-flex align-items-center mt-0">
                      <h5 className="mb-0 fw-bold">
                        <span>{product.product.category?.name}</span>
                        <span> / {product.product.subcategory[0]?.name}</span>
                      </h5>
                    </Col>
                    <Col
                      md={6}
                      className="d-flex align-items-center justify-content-start justify-content-md-end mt-0"
                    >
                      <h5 className="mb-0 fw-bold">
                        <span>{product.product.brand?.name}</span>
                      </h5>
                      <img
                        src={product.product.brand?.image}
                        alt={product.product.brand?.name}
                        className={`${style.brandImg}`}
                      />
                    </Col>
                    <Col sm={12}>
                      <button
                        onClick={() => removeCartItem(product.product.id)}
                        className="fs-5 btn btn-danger fw-bold"
                        disabled={disabledBtns.includes(product.product.id)}
                      >
                        <i className="fa fa-trash me-2"></i>
                        Remove Item
                      </button>
                    </Col>
                  </Row>
                </div>
              ))}
              <Link
                to={"/checkout"}
                className="btn bg-main text-white fw-bold w-100 mt-4"
              >
                Checkout
              </Link>
            </div>
          )}
          {cartItems?.products?.length === 0 && (
            <div className="bg-body-secondary fw-bold text-center p-4 rounded-3 fs-3">
              Your cart is empty try to buy some products
            </div>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default Cart;

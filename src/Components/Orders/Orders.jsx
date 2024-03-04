import React, { useEffect, useState } from "react";
import style from "./Orders.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Orders = () => {
  const { id } = jwtDecode(localStorage.getItem("userToken"));
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  async function getOrders() {
    setIsLoading(true);
    setOrders([]);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setIsError(null);
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      setIsError(error.response?.data?.message || "An error occurred.");
      setOrders([]);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <section className="orders py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {orders.length > 0 &&
            orders.map((order) => (
              <div
                className={`${style.userOrder} mb-4 p-3 rounded-3`}
                key={order.id}
              >
                <Row>
                  <Col md={4}>
                    <div className="order-details">
                      <h3 className="text-main fw-bold mb-4">Order details:</h3>
                      <h5>
                        <span className="fw-bold">City: </span>
                        <span className="text-info">
                          {order.shippingAddress.city}
                        </span>
                      </h5>
                      <h5>
                        <span className="fw-bold">Address: </span>
                        <span className="text-info">
                          {order.shippingAddress.details}
                        </span>
                      </h5>
                      <h5>
                        <span className="fw-bold">Phone: </span>
                        <span className="text-info">
                          {order.shippingAddress.phone}
                        </span>
                      </h5>
                      <h5>
                        <span className="fw-bold">Payment method: </span>
                        <span className="text-info">
                          {order.paymentMethodType}
                        </span>
                      </h5>
                      <h5>
                        <span className="fw-bold">Delivered: </span>
                        <span className="text-info">
                          {order.isDelivered ? "yes" : "no"}
                        </span>
                      </h5>
                      <h5>
                        <span className="fw-bold">Paid: </span>
                        <span className="text-info">
                          {order.isPaid ? "yes" : "no"}
                        </span>
                      </h5>
                      <h5 className="mt-4">
                        <span className="fw-bold">Order price: </span>
                        <span className="text-info">
                          {order.totalOrderPrice} EGP
                        </span>
                      </h5>
                    </div>
                  </Col>
                  <Col md={8}>
                    {order.cartItems.map((item) => (
                      <Row key={item._id} className="align-items-center gy-2">
                        <Col sm={12}>
                          <div className="product-item d-flex align-items-center p-2">
                            <img
                              src={item.product.imageCover}
                              className={`${style.productImg}`}
                            />
                            <div className="d-flex flex-column ms-3">
                              <h5 className="fw-bold">
                                {item.product.title
                                  .split(" ")
                                  .slice(0, 3)
                                  .join(" ")}
                              </h5>
                              <h5>
                                <span className="fw-bold">Count: </span>
                                <span className="text-info">{item.count}</span>
                              </h5>
                              <h5>
                                <span className="fw-bold">Price: </span>
                                <span className="text-info">{item.price}</span>
                              </h5>
                              <h5>
                                <span className="fw-bold">Category: </span>
                                <span className="text-info">
                                  {item.product.category?.name} /
                                  {item.product.subcategory[0]?.name}
                                </span>
                              </h5>
                              <h5 className="mb-0">
                                <img
                                  src={item.product.brand?.image}
                                  alt={item.product.brand?.name}
                                  className={`${style.brandImg} me-2`}
                                />
                                <span className="text-info">
                                  {item.product.brand?.name}
                                </span>
                              </h5>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </div>
            ))}
          {orders?.length === 0 && isLoading === false ? (
            <div className="bg-body-secondary fw-bold text-center p-4 rounded-3 fs-3">
              There are no orders try to buy some products
            </div>
          ) : null}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default Orders;

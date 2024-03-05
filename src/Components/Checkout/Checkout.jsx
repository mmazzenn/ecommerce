import React, { useContext, useState } from "react";
import style from "./Checkout.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Form } from "react-bootstrap";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

const Checkout = () => {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { cartId, setCartItemsNumber } = useContext(CartContext);
  const api = isOnline
    ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://ecommerce-smoky-beta.vercel.app/#/`
    : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
  async function orderPayment(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    setIsDisabled(true);

    try {
      const { data } = await axios.post(
        api,
        {
          shippingAddress: reqBody,
        },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      if (data.status === "success") {
        if (isOnline) {
          setCartItemsNumber(null);
          window.open(data.session.url, "_self");
        } else {
          toast.success("Order created successfully", {
            autoClose: 2000,
            position: "bottom-right",
          });
          setTimeout(() => {
            navigate("/allorders");
            setCartItemsNumber(null);
          }, 2000);
        }
      } else {
        toast.error("Oops, something bad happened", {
          autoClose: 2000,
          position: "bottom-right",
        });
        setIsDisabled(false);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    details: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]+(\s[A-Za-z0-9]+)*$/gi,
        "Invalid details"
      )
      .min(3, "Details is too short")
      .max(50, "Details is too long")
      .required("Details required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone number required"),
    city: Yup.string()
      .matches(/^[a-zA-Z]+(\s[A-Za-z]+)*$/gi, "Invalid city")
      .min(3, "City is too short")
      .max(20, "City is too long")
      .required("City required"),
  });

  const checkoutForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: orderPayment,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <section className={`${style.checkoutForm} my-5 mx-auto`}>
        <h2 className="mb-4">Checkout</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Form onSubmit={checkoutForm.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userPhone">Phone :</Form.Label>
            <Form.Control
              type="tel"
              id="userPhone"
              name="phone"
              value={checkoutForm.values.phone}
              onChange={checkoutForm.handleChange}
              onBlur={checkoutForm.handleBlur}
            ></Form.Control>
            {checkoutForm.errors.phone && checkoutForm.touched.phone ? (
              <div className="alert alert-danger mt-3">
                {checkoutForm.errors.phone}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userCity">City :</Form.Label>
            <Form.Control
              type="text"
              id="userCity"
              name="city"
              value={checkoutForm.values.city}
              onChange={checkoutForm.handleChange}
              onBlur={checkoutForm.handleBlur}
            ></Form.Control>
            {checkoutForm.errors.city && checkoutForm.touched.city ? (
              <div className="alert alert-danger mt-3">
                {checkoutForm.errors.city}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userDetails">Address :</Form.Label>
            <Form.Control
              as="textarea"
              id="userDetails"
              name="details"
              value={checkoutForm.values.details}
              onChange={checkoutForm.handleChange}
              onBlur={checkoutForm.handleBlur}
            ></Form.Control>
            {checkoutForm.errors.details && checkoutForm.touched.details ? (
              <div className="alert alert-danger mt-3">
                {checkoutForm.errors.details}
              </div>
            ) : null}
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center fw-bold">
            <div
              className={`${style.onlinePayment} d-flex justify-content-center align-items-center`}
            >
              <input
                id="paymentMethod"
                type="checkbox"
                className="me-2"
                onChange={() => setIsOnline(!isOnline)}
              />
              <label htmlFor="paymentMethod">Pay online</label>
            </div>
            {isOnline ? (
              <button
                type="submit"
                className="btn bg-main text-white ms-auto"
                disabled={
                  !(checkoutForm.isValid && checkoutForm.dirty) || isDisabled
                }
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Online Payment"
                )}
              </button>
            ) : (
              <button
                type="submit"
                className="btn bg-main text-white ms-auto"
                disabled={
                  !(checkoutForm.isValid && checkoutForm.dirty) || isDisabled
                }
              >
                {isLoading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Cash Payment"
                )}
              </button>
            )}
          </div>
        </Form>
      </section>
    </HelmetProvider>
  );
};

export default Checkout;

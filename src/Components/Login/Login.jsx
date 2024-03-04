import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form } from "react-bootstrap";
import { TokenContext } from "../../Context/TokenContext";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

const Login = () => {
  const { getCart } = useContext(CartContext);
  const { getWishlist } = useContext(WishlistContext);
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  let { setToken } = useContext(TokenContext);

  async function callLogin(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    setIsDisabled(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        reqBody
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate("/home");
        getCart();
        getWishlist();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
    setIsDisabled(false);
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]+$/g,
        "Password must contain small, capital and number"
      )
      .min(8, "Weak password")
      .max(30, "Password is too long")
      .required("Password required"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className={`${style.loginForm} my-5 mx-auto`}>
        <h2 className="mb-4">Login Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Form onSubmit={loginForm.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userEmail">Email :</Form.Label>
            <Form.Control
              type="email"
              id="userEmail"
              name="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            ></Form.Control>
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="alert alert-danger mt-3">
                {loginForm.errors.email}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="userPassword">Password :</Form.Label>
            <Form.Control
              type="password"
              id="userPassword"
              name="password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
            ></Form.Control>
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="alert alert-danger mt-3">
                {loginForm.errors.password}
              </div>
            ) : null}
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Link
              to={"/forget-password"}
              className={`${style.forgetPassword} fw-bold`}
            >
              Forget your password ?
            </Link>
            <button
              type="submit"
              className="btn d-block bg-main text-white ms-auto"
              disabled={!(loginForm.isValid && loginForm.dirty) || isDisabled}
            >
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
            </button>
          </div>
        </Form>
      </section>
    </HelmetProvider>
  );
};

export default Login;

import React, { useState } from "react";
import style from "./Register.module.css";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Register = () => {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  async function callRegister(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    setIsDisabled(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        reqBody
      );
      if (data.message === "success") {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsLoading(false);
    }
    setIsDisabled(false);
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]+(\s[A-Za-z]+)*$/gi, "Invalid name")
      .min(3, "Name is too short")
      .max(20, "Name is too long")
      .required("Name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string()
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]+$/g,
        "Password must contain small, capital and number"
      )
      .min(8, "Weak password")
      .max(30, "Password is too long")
      .required("Password required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and RePassword should match")
      .required("RePassword required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Phone number required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className={`${style.registerForm} my-5 mx-auto`}>
        <h2 className="mb-4">Register Now :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Form onSubmit={registerForm.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userName">Name :</Form.Label>
            <Form.Control
              type="text"
              id="userName"
              name="name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></Form.Control>
            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert alert-danger mt-3">
                {registerForm.errors.name}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userEmail">Email :</Form.Label>
            <Form.Control
              type="emaill"
              id="userEmail"
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></Form.Control>
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger mt-3">
                {registerForm.errors.email}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userPassword">Password :</Form.Label>
            <Form.Control
              type="password"
              id="userPassword"
              name="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></Form.Control>
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger mt-3">
                {registerForm.errors.password}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userRePassword">RePassword :</Form.Label>
            <Form.Control
              type="password"
              id="userRePassword"
              name="rePassword"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></Form.Control>
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger mt-3">
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label htmlFor="userPhone">Phone :</Form.Label>
            <Form.Control
              type="tel"
              id="userPhone"
              name="phone"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></Form.Control>
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger mt-3">
                {registerForm.errors.phone}
              </div>
            ) : null}
          </Form.Group>
          <button
            type="submit"
            className="btn d-block bg-main text-white ms-auto"
            disabled={
              !(registerForm.isValid && registerForm.dirty) || isDisabled
            }
          >
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </Form>
      </section>
    </HelmetProvider>
  );
};

export default Register;

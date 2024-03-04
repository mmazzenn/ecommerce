import React, { useContext, useState } from "react";
import style from "./ForgetPassword.module.css";
import axios from "axios";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ForgetPasswordContext } from "../../Context/ForgetPasswordContext";

const ForgetPassword = () => {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  const { setUserEmail } = useContext(ForgetPasswordContext);

  async function forgetPassword(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    setIsDisabled(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        reqBody
      );
      if (data.statusMsg === "success") {
        setUserEmail(reqBody.email);
        navigate("/verify-reset-code");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
    setIsDisabled(false);
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required"),
  });

  const forgetPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>Forget-Password</title>
      </Helmet>
      <section className={`${style.forgetPasswordForm} my-5 mx-auto`}>
        <h2 className="mb-4">Forget password :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Form onSubmit={forgetPasswordForm.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userEmail">Email :</Form.Label>
            <Form.Control
              type="email"
              id="userEmail"
              name="email"
              value={forgetPasswordForm.values.email}
              onChange={forgetPasswordForm.handleChange}
              onBlur={forgetPasswordForm.handleBlur}
            ></Form.Control>
            {forgetPasswordForm.errors.email &&
            forgetPasswordForm.touched.email ? (
              <div className="alert alert-danger mt-3">
                {forgetPasswordForm.errors.email}
              </div>
            ) : null}
          </Form.Group>
          <button
            type="submit"
            className="btn d-block bg-main text-white ms-auto"
            disabled={
              !(forgetPasswordForm.isValid && forgetPasswordForm.dirty) ||
              isDisabled
            }
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Send Code"
            )}
          </button>
        </Form>
      </section>
    </HelmetProvider>
  );
};

export default ForgetPassword;

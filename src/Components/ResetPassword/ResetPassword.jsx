import React, { useContext, useState } from "react";
import style from "./ResetPassword.module.css";
import axios from "axios";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ForgetPasswordContext } from "../../Context/ForgetPasswordContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { TokenContext } from "../../Context/TokenContext";

const ResetPassword = () => {
  const { getCart } = useContext(CartContext);
  const { getWishlist } = useContext(WishlistContext);
  let { setToken } = useContext(TokenContext);

  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  const { userEmail } = useContext(ForgetPasswordContext);

  async function resetPassword(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    setIsDisabled(true);
    const userDataObj = { email: userEmail, ...reqBody };
    try {
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        userDataObj
      );
      if (data?.token) {
        localStorage.setItem("userToken", data?.token);
        setToken(data?.token);
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
    newPassword: Yup.string()
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d]+$/g,
        "Password must contain small, capital and number"
      )
      .min(8, "Weak password")
      .max(30, "Password is too long")
      .required("Password required"),
  });

  const resetPasswordForm = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>Reset-Password</title>
      </Helmet>
      <section className={`${style.ResetPassword} my-5 mx-auto`}>
        <h2 className="mb-4">Reset Password :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Form onSubmit={resetPasswordForm.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userNewPassword">New password :</Form.Label>
            <Form.Control
              type="password"
              id="userNewPassword"
              name="newPassword"
              value={resetPasswordForm.values.newPassword}
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
            ></Form.Control>
            {resetPasswordForm.errors.newPassword &&
            resetPasswordForm.touched.newPassword ? (
              <div className="alert alert-danger mt-3">
                {resetPasswordForm.errors.newPassword}
              </div>
            ) : null}
          </Form.Group>
          <button
            type="submit"
            className="btn d-block bg-main text-white ms-auto"
            disabled={
              !(resetPasswordForm.isValid && resetPasswordForm.dirty) ||
              isDisabled
            }
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Change password"
            )}
          </button>
        </Form>
      </section>
    </HelmetProvider>
  );
};

export default ResetPassword;

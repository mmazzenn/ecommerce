import React, { useContext, useState } from "react";
import style from "./VerifyResetCode.module.css";
import axios from "axios";
import * as Yup from "yup";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ForgetPasswordContext } from "../../Context/ForgetPasswordContext";

const VerifyResetCode = () => {
  let navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isDisabled, setIsDisabled] = useState(false);
  const { setUserCode } = useContext(ForgetPasswordContext);

  async function verifyResetCode(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    setIsDisabled(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        reqBody
      );
      if (data.status === "Success") {
        setErrorMessage(false);
        setUserCode(reqBody.resetCode);
        navigate("/reset-password");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
    setIsDisabled(false);
  }
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]*$/g, "Invalid reset code")
      .required("Reset code required"),
  });

  const verifyResetCodeForm = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: verifyResetCode,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>Verify-Reset-Code</title>
      </Helmet>
      <section className={`${style.VerifyResetCode} my-5 mx-auto`}>
        <h2 className="mb-4">Reset code :</h2>
        {errorMessage ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}
        <Form onSubmit={verifyResetCodeForm.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label htmlFor="userCode">Enter code :</Form.Label>
            <Form.Control
              type="text"
              id="userCode"
              name="resetCode"
              value={verifyResetCodeForm.values.resetCode}
              onChange={verifyResetCodeForm.handleChange}
              onBlur={verifyResetCodeForm.handleBlur}
            ></Form.Control>
            {verifyResetCodeForm.errors.resetCode &&
            verifyResetCodeForm.touched.resetCode ? (
              <div className="alert alert-danger mt-3">
                {verifyResetCodeForm.errors.resetCode}
              </div>
            ) : null}
          </Form.Group>
          <button
            type="submit"
            className="btn d-block bg-main text-white ms-auto"
            disabled={
              !(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty) ||
              isDisabled
            }
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Verify reset code"
            )}
          </button>
        </Form>
      </section>
    </HelmetProvider>
  );
};

export default VerifyResetCode;

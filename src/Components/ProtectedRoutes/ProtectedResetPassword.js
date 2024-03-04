import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ForgetPasswordContext } from "../../Context/ForgetPasswordContext";

const ProtectedResetPassword = (props) => {
  const { userCode } = useContext(ForgetPasswordContext);
  if (!userCode) {
    return <Navigate to={"/forget-password"}></Navigate>;
  } else {
    return props.children;
  }
};

export default ProtectedResetPassword;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ForgetPasswordContext } from "../../Context/ForgetPasswordContext";

const ProtectedResetCode = (props) => {
  const { userEmail } = useContext(ForgetPasswordContext);
  if (!userEmail) {
    return <Navigate to={"/forget-password"}></Navigate>;
  } else {
    return props.children;
  }
};

export default ProtectedResetCode;

import { createContext, useState } from "react";

export const ForgetPasswordContext = createContext();

export default function ForgetPasswordContextProvider({ children }) {
  const [userEmail, setUserEmail] = useState(null);
  const [userCode, setUserCode] = useState(null);
  return (
    <ForgetPasswordContext.Provider
      value={{ userEmail, setUserEmail, userCode, setUserCode }}
    >
      {children}
    </ForgetPasswordContext.Provider>
  );
}

import { createContext, useState, useEffect } from "react";

export const BrandContext = createContext();

export default function BrandContextProvider(props) {
  const [brandName, setBrandNameState] = useState("");

  useEffect(() => {
    const storedBrandName = sessionStorage.getItem("brandName");
    if (storedBrandName) {
      setBrandNameState(storedBrandName);
    }
  }, []);

  const setBrandName = (name) => {
    sessionStorage.setItem("brandName", name);
    setBrandNameState(name);
  };

  return (
    <BrandContext.Provider value={{ brandName, setBrandName }}>
      {props.children}
    </BrandContext.Provider>
  );
}

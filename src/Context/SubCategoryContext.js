import { createContext, useState, useEffect } from "react";

export const SubCategoryContext = createContext();

export default function SubCategoryContextProvider(props) {
  const [subCategoryName, setSubCategoryNameState] = useState("");

  useEffect(() => {
    const storedSubCategoryName = sessionStorage.getItem("subCategoryName");
    if (storedSubCategoryName) {
      setSubCategoryNameState(storedSubCategoryName);
    }
  }, []);

  const setSubCategoryName = (name) => {
    sessionStorage.setItem("subCategoryName", name);
    setSubCategoryNameState(name);
  };

  return (
    <SubCategoryContext.Provider
      value={{ subCategoryName, setSubCategoryName }}
    >
      {props.children}
    </SubCategoryContext.Provider>
  );
}

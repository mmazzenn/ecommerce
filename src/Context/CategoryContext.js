
import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [categoryName, setCategoryNameState] = useState("");

  useEffect(() => {
    const storedCategoryName = sessionStorage.getItem("categoryName");
    if (storedCategoryName) {
      setCategoryNameState(storedCategoryName);
    }
  }, []);

  const setCategoryName = (name) => {
    sessionStorage.setItem("categoryName", name);
    setCategoryNameState(name);
  };

  return (
    <CategoryContext.Provider value={{ categoryName, setCategoryName }}>
      {props.children}
    </CategoryContext.Provider>
  );
}

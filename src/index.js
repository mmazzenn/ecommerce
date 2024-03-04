import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TokenContextProvider from "./Context/TokenContext";
import { QueryClient, QueryClientProvider } from "react-query";
import CategoryContextProvider from "./Context/CategoryContext";
import SubCategoryContextProvider from "./Context/SubCategoryContext";
import BrandContextProvider from "./Context/BrandContext";
import CartContextProvider from "./Context/CartContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistContextProvider from "./Context/WishlistContext";
import ForgetPasswordContextProvider from "./Context/ForgetPasswordContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const query = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <TokenContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <ForgetPasswordContextProvider>
              <CategoryContextProvider>
                <SubCategoryContextProvider>
                  <BrandContextProvider>
                    <App />
                    <ToastContainer />
                  </BrandContextProvider>
                </SubCategoryContextProvider>
              </CategoryContextProvider>
            </ForgetPasswordContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { useContext, useEffect } from "react";
import { TokenContext } from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProtectedLogin from "./Components/ProtectedRoutes/ProtectedLogin";
import SubCategories from "./Components/SubCategories/SubCategories";
import SubCategoryOfCategory from "./Components/SubCategoryOfCategory/SubCategoryOfCategory";
import ProductsOfCategory from "./Components/ProductsOfCategory/ProductsOfCategory";
import ProductsOfSubcategory from "./Components/ProductsOfSubcategory/ProductsOfSubcategory";
import ProductsOfBrand from "./Components/ProductsOfBrand/ProductsOfBrand";
import Wishlist from "./Components/Wishlist/Wishlist";
import Orders from "./Components/Orders/Orders";
import Checkout from "./Components/Checkout/Checkout";
import { CartContext } from "./Context/CartContext";
import ProtectedCheckout from "./Components/ProtectedRoutes/ProtectedCheckout";
import ProtectedResetCode from "./Components/ProtectedRoutes/ProtectedResetCode";
import ProtectedResetPassword from "./Components/ProtectedRoutes/ProtectedResetPassword";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  const { getCart } = useContext(CartContext);
  const routes = createHashRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products/:productId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/subcategories",
          element: (
            <ProtectedRoutes>
              <SubCategories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/subcategories/:categoryId",
          element: (
            <ProtectedRoutes>
              <SubCategoryOfCategory />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/products/:categoryId",
          element: (
            <ProtectedRoutes>
              <ProductsOfCategory />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories/subcategories/products/:subCategoryId",
          element: (
            <ProtectedRoutes>
              <ProductsOfSubcategory />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands/products/:brandId",
          element: (
            <ProtectedRoutes>
              <ProductsOfBrand />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <ProtectedCheckout>
                <Checkout />
              </ProtectedCheckout>
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedLogin>
              <Login />
            </ProtectedLogin>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedLogin>
              <Register />
            </ProtectedLogin>
          ),
        },
        {
          path: "forget-password",
          element: (
            <ProtectedLogin>
              <ForgetPassword />
            </ProtectedLogin>
          ),
        },
        {
          path: "verify-reset-code",
          element: (
            <ProtectedLogin>
              <ProtectedResetCode>
                <VerifyResetCode />
              </ProtectedResetCode>
            </ProtectedLogin>
          ),
        },
        {
          path: "reset-password",
          element: (
            <ProtectedLogin>
              <ProtectedResetPassword>
                <ResetPassword />
              </ProtectedResetPassword>
            </ProtectedLogin>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let { setToken } = useContext(TokenContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
      getCart();
    }
  }, []);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;

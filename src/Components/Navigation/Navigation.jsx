import React, { useContext, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import logo from "../../assets/images/logo.svg";

import style from "./Navigation.module.css";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";

const Navigation = () => {
  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    setToken(null);
    navigate("/login");
  }

  const { cartItemsNumber } = useContext(CartContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "userToken") {
        if (!event.newValue) {
          setToken(null);
          navigate("/login");
          localStorage.clear();
          sessionStorage.clear();
        } else if (localStorage.getItem("userToken") !== token) {
          setToken(null);
          navigate("/login");
          localStorage.clear();
          sessionStorage.clear();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Navbar expand="xl" className="bg-body-tertiary" fixed="top">
      <Container fluid="sm">
        <Link to={token ? "/home" : "/login"} className="navbar-brand">
          <img src={logo} alt="logo" />
        </Link>
        {token && (
          <>
            <NavLink
              to={"cart"}
              className="nav-link ms-0 ms-lg-1 d-xl-none position-relative"
            >
              <i className="fa-solid fa-cart-shopping fs-3 text-main"></i>
              {cartItemsNumber && (
                <span className="position-absolute top-0 start-50 badge rounded-pill bg-danger text-white fw-bold">
                  {cartItemsNumber}
                </span>
              )}
            </NavLink>
          </>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {token ? (
            <Nav className="ms-auto">
              <Nav className={`${style.socialIcons} flex-row gap-4 gap-xl-0`}>
                <Nav.Link className="nav-link">
                  <i className="fa-brands fa-instagram"></i>
                </Nav.Link>
                <Nav.Link className="nav-link">
                  <i className="fa-brands fa-facebook"></i>
                </Nav.Link>
                <Nav.Link className="nav-link">
                  <i className="fa-brands fa-tiktok"></i>
                </Nav.Link>
                <Nav.Link className="nav-link">
                  <i className="fa-brands fa-twitter"></i>
                </Nav.Link>
                <Nav.Link className="nav-link">
                  <i className="fa-brands fa-linkedin"></i>
                </Nav.Link>
                <Nav.Link className="nav-link">
                  <i className="fa-brands fa-youtube"></i>
                </Nav.Link>
              </Nav>
              <NavLink
                to={"/home"}
                className={`nav-link ms-0 ms-lg-1 ${
                  isHomePage ? "active" : ""
                }`}
              >
                Home
              </NavLink>
              <NavLink to={"products"} className="nav-link ms-0 ms-lg-1">
                Products
              </NavLink>
              <NavLink to={"categories"} className="nav-link ms-0 ms-lg-1">
                Categories
              </NavLink>
              <NavLink to={"brands"} className="nav-link ms-0 ms-lg-1">
                Brands
              </NavLink>
              <NavLink to={"wishlist"} className="nav-link ms-0 ms-lg-1">
                Wishlist
              </NavLink>
              <NavLink to={"allorders"} className="nav-link ms-0 ms-lg-1">
                Orders
              </NavLink>
            </Nav>
          ) : null}
          <Nav className="ms-auto align-items-xl-center">
            {token ? (
              <>
                <NavLink
                  to={"cart"}
                  className="nav-link ms-0 ms-lg-1 align-self-center d-none d-xl-flex position-relative"
                >
                  <i className="fa-solid fa-cart-shopping fs-3 text-main"></i>
                  {cartItemsNumber && (
                    <span className="position-absolute top-0 start-50 badge rounded-pill bg-danger text-white fw-bold">
                      {cartItemsNumber}
                    </span>
                  )}
                </NavLink>
                <button
                  onClick={logOut}
                  className="nav-link ms-0 ms-lg-1 text-start"
                >
                  SignOut
                </button>
              </>
            ) : (
              <>
                <NavLink to={"register"} className="nav-link ms-0 ms-lg-1">
                  Register
                </NavLink>
                <NavLink to={"login"} className="nav-link ms-0 ms-lg-1">
                  SignIn
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

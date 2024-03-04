import React from "react";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";

const LayOut = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
      <div>
        <Offline polling={false}>
          <div className="network">
            <i className="fa-solid fa-wifi me-2"></i>
            You're offline right now. Check your connection.
          </div>
        </Offline>
      </div>
    </>
  );
};

export default LayOut;

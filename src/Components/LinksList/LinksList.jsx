import React from "react";
import style from "./LinksList.module.css";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const LinksList = (props) => {
  return (
    <Breadcrumb
      className={`${style.links} bg-body-secondary fw-bold py-3 px-3 rounded-2 mb-3`}
    >
      {props.links.map((link, index) => (
        <div className="navigation-link" key={index}>
          <Link className="text-dark me-2 ms-2" to={link.values}>
            {link.keys}
          </Link>
          <span>/</span>
        </div>
      ))}
      {props.activeLink.map((link, index) => (
        <div className="navigation-link" key={index}>
          <Link className={`${style.active} text-main ms-2`} to={link.values}>
            {link.keys}
          </Link>
          {props.afterActiveLinks && <span className="ms-2">/</span>}
        </div>
      ))}
      {props.afterActiveLinks &&
        props.afterActiveLinks.map((link, index) => (
          <div className="navigation-link" key={index}>
            <Link className="text-dark me-2 ms-2" to={link.values}>
              {link.keys}
            </Link>
          </div>
        ))}
    </Breadcrumb>
  );
};

export default LinksList;

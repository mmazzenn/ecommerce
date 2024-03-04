import React from "react";
import style from "./ProductPriceRating.module.css";

const ProductPriceRating = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="price">
        <span
          className={`${style.priceRatingMain} fw-bold ${
            props.discount ? "text-decoration-line-through" : ""
          }`}
        >
          {props.price} EGP
        </span>
        {props.discount && (
          <span className={`${style.priceRatingMain} fw-bold ms-2`}>
            {props.discount} EGP
          </span>
        )}
      </div>
      <div className="rating text-t">
        <i className="fas fa-star rating-color"></i>
        <span className={`${style.priceRatingMain} fw-bold ms-1`}>
          {props.rating}
        </span>
      </div>
    </div>
  );
};

export default ProductPriceRating;

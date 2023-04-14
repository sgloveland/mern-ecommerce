import React from "react";

export default function ProductCard({ image, name, brand, price, id }) {
  return (
    <div className="product-card" id={id}>
      <div className="product-card-image-container">
        <img src={image} />
      </div>
      <h3 className="product-card-name">{name}</h3>
      <p className="product-card-brand">{brand}</p>
      <p className="product-card-price">${price}</p>
    </div>
  );
}

import React from "react";
import ProductCard from "./components/ProductCard";

export default function OrderDetails({ order, products }) {
  return (
    <>
      <div className="confirmation-details">
        <h1>Your order has been placed!</h1>
        <p>
          <strong>Name: </strong>
          {order?.firstName} {order?.lastName}
        </p>
        <p>
          <strong>Email: </strong>
          {order?.email}
        </p>
        <p>
          <strong>Phone: </strong>
          {order?.phone}
        </p>
        <p>
          <strong>Address: </strong>
          {order?.address}
        </p>
        <p>
          <strong>Shipping method: </strong>
          {order?.shippingMethod}
        </p>
      </div>
      &nbsp;
      <div className="confirmation-products">
        <h2>Order #{order?._id.toString()} </h2>
        <div className="products-ordered">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              id={product._id}
              name={product.name}
              price={product.price}
              brand={product.brand}
              image={product.imageURL}
            />
          ))}
        </div>
      </div>
    </>
  );
}

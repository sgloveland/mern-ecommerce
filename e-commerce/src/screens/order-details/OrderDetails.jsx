import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [serverRenderedOrder, setServerRenderedOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/order/${id}`)
      .then((res) => res.text())
      .then((data) => {
        setServerRenderedOrder(data);
      })
      .catch((error) => console.log(error));
  }, [id]);


  useEffect(() => {
    if (serverRenderedOrder) {
      const productCardElements = document
        .getElementById('server-rendered-element')
        .getElementsByClassName('confirmation-products')[0]
        .getElementsByClassName('products-ordered')[0]
        .getElementsByClassName('product-card');

        
      for(let i = 0; i < productCardElements.length; ++i) {
        productCardElements[i].addEventListener("click", () => {
          navigate(`/product/${productCardElements[i].id}`);
        })
      }
    }
  }, [serverRenderedOrder])

  return (
    <div>
      <Header title="Order Confirmation" />
      {serverRenderedOrder && (
        <div
          id="server-rendered-element"
          dangerouslySetInnerHTML={{ __html: serverRenderedOrder }}
        />
      )}
    </div>
  );
};

export default OrderDetails;

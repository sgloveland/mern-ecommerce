import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./ProductDetailsScreen.css";

function ProductDetailsScreen() {
  //product related things
  const [serverData, setServerData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/product/${id}`)
      .then((res) => res.text())
      .then((data) => {
        setServerData(data);
      })
      .catch((error) =>
        console.log("Error getting server rendered page: " + error)
      );
  }, [id]);

  const addToCart = async () => {
    try {
      await fetch(`http://localhost:4000/api/cart/add/${id}`, {
        method: "get",
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="details-screen">
      <Header title={"Product Details"} />

      {serverData && <div dangerouslySetInnerHTML={{ __html: serverData }} />}
      {serverData && (
        <button className="add-button" type="button" onClick={addToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductDetailsScreen;

import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function ProductCard({ id, name, price, brand, image, onRemove }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={onRemove ? null : handleClick}>
      <div
        className="product-card-image-container"
        onClick={onRemove ? handleClick : null}
      >
        <img src={image} />
      </div>
      <h3 className="product-card-name">{name}</h3>
      <p className="product-card-brand">{brand}</p>
      <p className="product-card-price">${price}</p>
      {onRemove ? (
        <DeleteIcon
          fontSize="large"
          className="remove-icon"
          onClick={onRemove}
        />
      ) : null}
    </div>
  );
}

export default ProductCard;

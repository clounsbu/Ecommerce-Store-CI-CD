import type { FC } from "react";
import type { Product } from "../../types/types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

type ProductCardProps = {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
};

const ProductCard: FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-md-5 p-4 d-flex flex-column align-items-center gap-3 shadow">
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        width="100"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/100";
        }}
      />
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      {product.rating ? (
        <Rating
          style={{ maxWidth: 100 }}
          value={product.rating.rate}
          readOnly
        />
      ) : (
        <p>No rating available</p>
      )}

      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;

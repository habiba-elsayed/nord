import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="d-block overflow-hidden rounded-1"
      >
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid w-100"
          loading="lazy"
        />
      </Link>

      <div className="mt-3 d-flex align-items-start justify-content-between">
        <div>
          <Link
            to={`/product/${product.id}`}
            className="text-decoration-none text-body"
          >
            <h3 className="fs-6 fw-medium mb-1">{product.name}</h3>
          </Link>
          <p className="small text-secondary mb-0">${product.price}</p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="btn p-2 text-secondary"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={16} />
        </button>
      </div>
    </div>
  );
}
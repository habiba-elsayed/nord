import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted mb-4">Your cart is empty.</p>
        <Link to="/products" className="btn btn-dark">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Cart</h1>

      <div className="row">
        <div className="col-lg-8">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="d-flex align-items-center border-bottom py-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid me-4"
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
              />

              <div className="flex-grow-1">
                <h6 className="mb-1">{product.name}</h6>
                <p className="text-muted mb-2">${product.price}</p>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQuantity(product.id, quantity - 1)
                    }
                  >
                    <Minus size={14} />
                  </button>

                  <span>{quantity}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQuantity(product.id, quantity + 1)
                    }
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-end ms-4">
                <p className="fw-medium mb-2">
                  ${product.price * quantity}
                </p>
                <button
                  className="btn btn-link text-danger p-0"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="border p-4">
            <h5 className="mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>${totalPrice}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping</span>
              <span>{totalPrice >= 100 ? "Free" : "$12"}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span>
              <span>
                ${totalPrice + (totalPrice >= 100 ? 0 : 12)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="btn btn-dark w-100"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
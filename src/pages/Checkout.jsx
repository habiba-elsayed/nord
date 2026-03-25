import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Checkout({ user }) {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const shipping = totalPrice >= 100 ? 0 : 12;

  if (!items.length && !submitted) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Your cart is empty.</p>
        <Link to="/products" className="btn btn-dark mt-3">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container py-5 text-center">
        <CheckCircle size={64} className="mb-4" />
        <h1 className="mb-3">Thank you!</h1>
        <p className="text-muted">{message || "Your order has been placed successfully."}</p>
        <Link to="/" className="btn btn-dark mt-4">
          Back to home
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending order...");

    // Collect form data
    const form = Object.fromEntries(new FormData(e.target).entries());
    const orderData = {
      user_id: user?.id || 0,
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
      subtotal: totalPrice,
      shipping,
      total: totalPrice + shipping,
      cart_items: items.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      }))
    };

    try {
      const res = await fetch("http://localhost/php-api/saveOrder.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (data.success) {
        clearCart();
        setMessage("Order placed successfully!");
        setSubmitted(true);
      } else {
        setMessage(data.error || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <h5 className="mb-3">Shipping Information</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <input name="firstName" className="form-control" placeholder="First Name" required />
              </div>
              <div className="col-md-6">
                <input name="lastName" className="form-control" placeholder="Last Name" required />
              </div>
              <div className="col-md-12">
                <input name="email" type="email" className="form-control" placeholder="Email" required />
              </div>
              <div className="col-md-12">
                <input name="address" className="form-control" placeholder="Address" required />
              </div>
              <div className="col-md-6">
                <input name="city" className="form-control" placeholder="City" required />
              </div>
              <div className="col-md-6">
                <input name="state" className="form-control" placeholder="State" required />
              </div>
              <div className="col-md-6">
                <input name="zip" className="form-control" placeholder="Zip Code" required />
              </div>
              <div className="col-md-6">
                <input name="country" className="form-control" placeholder="Country" required />
              </div>
            </div>

            <h5 className="mt-4 mb-3">Payment (Demo)</h5>
            <div className="row g-3">
              <div className="col-md-12">
                <input className="form-control" defaultValue="4242 4242 4242 4242" placeholder="Card Number" />
              </div>
              <div className="col-md-6">
                <input className="form-control" defaultValue="12/28" placeholder="MM/YY" />
              </div>
              <div className="col-md-6">
                <input className="form-control" defaultValue="123" placeholder="CVC" />
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-4">
              Place Order — ${totalPrice + shipping}
            </button>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="border p-4 mt-4 mt-lg-0">
            <h5 className="mb-3">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping</span>
              <span>{shipping === 0 ? "Free" : "$12"}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${totalPrice + shipping}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams(); // get the product id from URL
  const { addToCart } = useCart();

  // Convert id to number and find product
  const product = products.find(p => p.id === Number(id));

  // If product not found
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5 ">
      <p className="text-dark" ><a href="/products" className="text-dark text-decoration-none"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>   Back To Shop</a></p>
      <div className="row align-items-start g-4"> 
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid w-100"
          />
        </div>

        <div className="col-md-6 ">
          <p className="text-muted text-uppercase small">{product.category}</p>
          <h1 className="mb-3">{product.name}</h1>
          <h4 className="mb-4">${product.price}</h4>
          <p className="text-muted">{product.description}</p>

         <div className="d-grid gap-2">
           <button
            className="btn btn-accent mt-3 mb-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
         </div>
            <div className="border-top"></div>
          <h5 className=" mt-3">Details:</h5>
          <ul className="list-unstyled ">
            {product.details.map((detail, idx) => (
              <li key={idx} className="text-muted">
                • {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
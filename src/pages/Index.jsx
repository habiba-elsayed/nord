import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function Index() {
  const featured = products.filter(p => p.featured);

  return (
    <>
      {/* HERO */}
      <section
        className="hero text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="container">
          <div className="col-md-6">
            <h1>Designed for<br />mindful living</h1>
            <p className="mt-3">
              Scandinavian-inspired homeware crafted from natural materials.
              Simple forms, lasting quality.
            </p>
            <Link to="/products" className="btn btn-accent mt-4">
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
       <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="d-flex justify-content-between align-content-center pb-3">
         <h2 className="section-heading mt-4">Featured </h2>
         
         <Link className="nav-link mt-4 fs-5" to="/products">
          View all →
        </Link>
       </div>

 <div className="row g-3">
  {featured.slice(0, 4).map(product => (
    <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="product-card h-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image w-100"
          />
        </Link>

        <div className="mt-3">
          <h5 className="text-sm font-medium">{product.name}</h5>
          <p className="text-sm text-muted-foreground">${product.price}</p>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
      </div>
    </div>
  ))}
</div>
    </section>

      {/* VALUES */}
      <section className="py-5 border-top">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <h6>Natural Materials</h6>
              <p className="text-muted">
                Wood, linen, ceramic — nothing synthetic.
              </p>
            </div>
            <div className="col-md-4">
              <h6>Ethical Craft</h6>
              <p className="text-muted">
                Fair wages and small-batch production.
              </p>
            </div>
            <div className="col-md-4">
              <h6>Free Shipping</h6>
              <p className="text-muted">
                On every order over $100.
              </p>
            </div>
          </div>
          
         
        </div>
      </section>
    </>
  );
}
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shop</h1>

      {/* Category Filter */}
      <div className="mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn me-2 mb-2 ${
              selectedCategory === category ? "btn-accent" : "btn-outline-accent"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
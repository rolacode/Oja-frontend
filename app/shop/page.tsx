"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/v1/vendors/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("❌ Failed to fetch products", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <img
              src={product.image}
              alt={product.name}
              width="100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/fallback.jpeg"; // Use a local fallback image
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Shop;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const goToDetails = () => {
    navigate(`/customer/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">

      {/* CLICKABLE AREA: Image + Title */}
      <div onClick={goToDetails} className="cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />

        <h3 className="mt-2 font-semibold hover:underline">
          {product.title}
        </h3>
      </div>

      {/* PRICE */}
      <p className="mt-1 text-lg font-bold">
        ₹{product.price.toLocaleString()}
      </p>

      {/* ADD TO CART BUTTON */}
      <button
  onClick={(e) => {
    e.stopPropagation();   // ✅ STEP 4 IS HERE
    addToCart(product);
  }}
  className="mt-2 bg-yellow-400 w-full py-2 rounded font-semibold hover:bg-yellow-500"
>
  Add to Cart
</button>


    </div>
  );
}

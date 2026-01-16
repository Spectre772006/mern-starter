import products from "../../data/products";
import ProductCard from "../../components/ProductCard";
import HeroBanner from "../../components/customer/HeroBanner";
import { useEffect, useState } from "react";
export default function CustomerHome() {
    const [recentlyViewed, setRecentlyViewed] = useState([]);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  setRecentlyViewed(stored);
}, []);

  return (
    <div className="space-y-8">
      
      {/* Categories */}
      <section className="flex gap-4 overflow-x-auto">
        <div className="px-4 py-2 bg-gray-100 rounded">Electronics</div>
        <div className="px-4 py-2 bg-gray-100 rounded">Fashion</div>
        <div className="px-4 py-2 bg-gray-100 rounded">Home</div>
        <div className="px-4 py-2 bg-gray-100 rounded">Books</div>
      </section>

      {/* Banner */}
       <div className="bg-gray-100 min-h-screen">

      {/* HERO CAROUSEL */}
      <HeroBanner />

      {/* RECOMMENDED PRODUCTS */}
      <section className="px-6 mt-8">
  <h2 className="text-xl font-semibold mb-4">
    Recommended Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>
{/* RECENTLY VIEWED */}
{recentlyViewed.length > 0 && (
  <section className="px-6 mt-12">
    <h2 className="text-xl font-semibold mb-4">
      Recently Viewed
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {recentlyViewed.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
)}

    </div>
      {/* Products placeholder */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recommended Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-40 bg-gray-100 rounded"></div>
          <div className="h-40 bg-gray-100 rounded"></div>
          <div className="h-40 bg-gray-100 rounded"></div>
          <div className="h-40 bg-gray-100 rounded"></div>
        </div>
      </section>

    </div>
  );
}

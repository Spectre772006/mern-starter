import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import BreadcrumbSchema from "../../components/BreadcrumbSchema";
import { useParams } from "react-router-dom";
import { useState } from "react";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";


export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
const navigate = useNavigate();


  // find product (can be undefined)
  const product = products.find((p) => String(p.id) === String(id));

  // ✅ SAFE defaults (hooks MUST always run)
  const images =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  const [selectedImage, setSelectedImage] = useState(images[0] || "");

  
  const breadcrumbItems = [
  { label: "Home", href: "/customer/home" },
  { label: "Products", href: "/customer/home" },
  { label: product.title }
];

  // ❗ render guard AFTER hooks
  if (!product) {
    return <div className="p-6">Product not found</div>;
  }
 const handleBuyNow = () => {
  navigate("/customer/payment", {
    state: {
      type: "BUY_NOW",
      items: [
        {
          ...product,
          quantity: 1,
        },
      ],
    },
  });
};

  return (
  <>
    {/* Breadcrumbs */}
    <Breadcrumbs items={breadcrumbItems} />

    {/* Page Wrapper */}
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT: Image Gallery */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setSelectedImage(img)}
              className={`w-16 h-16 object-cover border cursor-pointer rounded ${
                selectedImage === img ? "border-yellow-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1 border rounded p-4 flex items-center justify-center">
          <img
            src={selectedImage}
            alt={product.title}
            className="max-h-[450px] object-contain"
          />
        </div>
      </div>

      {/* CENTER: Product Info */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="text-yellow-600">★★★★☆ <span className="text-gray-600">(127 ratings)</span></p>
        <p className="text-gray-600">{product.description || "No description available."}</p>
      </div>

      {/* RIGHT: Buy Box */}
      <div className="border rounded p-4 space-y-3">
        <p className="text-2xl font-bold text-red-600">
          ₹{product.price?.toLocaleString()}
        </p>
        <p className="text-green-600 font-semibold">In stock</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
        >
          Add to Cart
        </button>
        <button
  onClick={handleBuyNow}
  className="w-full bg-orange-400 hover:bg-orange-500 py-2 rounded font-semibold"
>
  Buy Now
</button>



        <p className="text-xs text-gray-500">Secure transaction</p>
      </div>

    </div>
  </>
);
}
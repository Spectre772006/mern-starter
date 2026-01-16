import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    savedItems,
    removeFromCart,
    updateQty,
    saveForLater,
    moveToCart,
    removeFromSaved,
  } = useCart();
const navigate = useNavigate();

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );

  const freeDelivery = subtotal >= 500;

  const handleCheckout = () => {
  navigate("/customer/payment", {
    state: {
      type: "CART",
      items: cartItems, // from CartContext
    },
  });
};


  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* LEFT SIDE */}
      <div className="md:col-span-2 space-y-6">
        
        {/* CART SECTION */}
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="font-bold">₹{item.price}</p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="border px-2"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-4 text-sm mt-3">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => saveForLater(item)}
                      className="text-blue-600"
                    >
                      Save for later
                    </button>
                    <button className="text-blue-600">
                      See more like this
                    </button>
                    <button
                      onClick={() =>
                        navigator.share
                          ? navigator.share({ title: item.title })
                          : alert("Sharing not supported")
                      }
                      className="text-blue-600"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SAVED FOR LATER — ALWAYS BELOW */}
        {savedItems.length > 0 && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              Saved for later ({savedItems.length} items)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <h3 className="mt-2 font-semibold">
                    {item.title}
                  </h3>
                  <p className="font-bold">₹{item.price}</p>

                  <button
                    onClick={() => moveToCart(item)}
                    className="mt-2 w-full border rounded py-2"
                  >
                    Move to cart
                  </button>

                  <div className="flex gap-4 text-sm mt-2">
                   <button
  onClick={() => removeFromSaved(item.id)}
  className="text-blue-600"
>
  Delete
</button>

                    <button className="text-blue-600">
                      See more like this
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE — SUMMARY */}
      <div className="bg-white p-6 rounded shadow h-fit">
        {freeDelivery && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            ✅ Your order is eligible for <b>FREE Delivery</b>
          </div>
        )}

        <p className="font-semibold">
          Subtotal ({totalItems} items):
        </p>
        <p className="text-xl font-bold mb-4">
          ₹{subtotal.toFixed(2)}
        </p>

        <button
  onClick={() => navigate("/customer/payment")}
  className="w-full bg-yellow-400 py-3 rounded font-semibold"
>
  Proceed to Buy
</button>

      </div>
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // 🔹 Decide source of items
  const isBuyNow = location.state?.type === "BUY_NOW";
  const items = isBuyNow ? location.state.items : cartItems;

  // 🔹 Safety fallback
  if (!items || items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2>No items selected</h2>
        <button
          onClick={() => navigate("/customer/home")}
          className="mt-4 text-blue-600 underline"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // 🔹 Total calculation
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT SECTION */}
      <div className="md:col-span-2 space-y-6">

        {/* DELIVERY ADDRESS */}
        <div className="border rounded p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              Delivering to Aryan Salunkhe
            </h2>
            <button className="text-blue-600 text-sm">Change</button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            403 Sundaram Apt, Juinagar Sec 24, Navi Mumbai, Maharashtra,
            400705, India
          </p>

          <button className="text-blue-600 text-sm mt-2">
            Add delivery instructions
          </button>
        </div>

        {/* PAYMENT METHOD */}
        <div className="border rounded p-4 space-y-3">
          <h2 className="font-semibold text-lg">Payment method</h2>

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Credit / Debit Card
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Net Banking
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            UPI
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* RIGHT SECTION — ORDER SUMMARY */}
      <div className="border rounded p-4 h-fit sticky top-6">
        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm mb-2"
          >
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>
              ₹{(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Order Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>

        <button
          className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
        >
          Use this payment method
        </button>
      </div>
    </div>
  );
}

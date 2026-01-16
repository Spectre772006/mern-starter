import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressModal from "./AddressModal";
import { useCart } from "../../context/CartContext";
import { useAddress } from "../../context/AddressContext";

export default function Checkout() {
  const { cartItems } = useCart();
  const {
    addresses,
    selectedAddressId,
    selectAddress,
    deleteAddress,
  } = useAddress();const [showAddressModal, setShowAddressModal] = useState(false);


const navigate = useNavigate();
const canProceed =
  cartItems.length > 0 &&
  addresses.length > 0 &&
  selectedAddressId;


  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const FREE_DELIVERY_LIMIT = 500;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_LIMIT;
  const remainingForFreeDelivery = FREE_DELIVERY_LIMIT - subtotal;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">

        {/* ADDRESS SECTION */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>

          {addresses.length === 0 && (
            <p className="text-gray-500">
              No address found. Please add a new address.
            </p>
          )}

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`border rounded p-4 flex justify-between ${
                  selectedAddressId === addr.id
                    ? "border-yellow-500 bg-yellow-50"
                    : ""
                }`}
              >
                <label className="flex gap-3 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedAddressId === addr.id}
                    onChange={() => selectAddress(addr.id)}
                  />

                  <div>
                    <p className="font-semibold">{addr.name}</p>
                    <p className="text-sm">
                      {addr.addressLine}, {addr.city}, {addr.state} –{" "}
                      {addr.pincode}
                    </p>
                    <p className="text-sm">Phone: {addr.phone}</p>
                  </div>
                </label>

                <div className="text-sm text-blue-600 space-x-3">
                  <button>Edit</button>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

         
        </div>
<button
  className="mt-4 text-blue-600 font-semibold"
  onClick={() => setShowAddressModal(true)}
>
  + Add New Address
</button>

        {/* ITEMS SECTION */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">
            Items ({cartItems.length})
          </h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b py-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p>₹{item.price}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE — ORDER SUMMARY */}
      <div className="bg-white p-6 rounded shadow h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>{isFreeDelivery ? "FREE" : "₹40"}</span>
        </div>

        {isFreeDelivery ? (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-3 text-sm">
            ✅ Your order is eligible for FREE Delivery
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-3 text-sm">
            Add ₹{remainingForFreeDelivery} more for FREE Delivery
          </div>
        )}

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>
            ₹{isFreeDelivery ? subtotal : subtotal + 40}
          </span>
        </div>
{/* VALIDATION MESSAGES */}
{cartItems.length === 0 && (
  <p className="text-sm text-red-600 mt-2">
    Your cart is empty. Add items to continue.
  </p>
)}

{cartItems.length > 0 && addresses.length === 0 && (
  <p className="text-sm text-red-600 mt-2">
    Please add a delivery address to continue.
  </p>
)}

{cartItems.length > 0 &&
  addresses.length > 0 &&
  !selectedAddressId && (
    <p className="text-sm text-red-600 mt-2">
      Please select a delivery address to continue.
    </p>
)}

       <button
  type="button"
  className="w-full bg-yellow-400 hover:bg-yellow-500 p-3 rounded font-semibold disabled:opacity-50"
  disabled={!canProceed}
  onClick={() => navigate("/customer/payment")}
>
  Place Your Order
</button>
{!canProceed && (
  <p className="text-xs text-gray-500 mt-2">
    Complete all required steps to proceed to payment.
  </p>
)}


      </div>
      {showAddressModal && (
  <AddressModal onClose={() => setShowAddressModal(false)} />
)}

    </div>
    
  );
}

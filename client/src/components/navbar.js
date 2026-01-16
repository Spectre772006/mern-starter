import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
const isPaymentPage = location.pathname === "/customer/payment";
  const { logout } = useAuth();
const [openAccount, setOpenAccount] = useState(false);

const { cartItems } = useCart();

const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
  
);

  // Hide on auth pages
  if (["/login", "/register"].includes(location.pathname)) return null;

  return (
    <nav className="w-full bg-white shadow-sm px-4 py-2">
  <div className="flex items-center gap-4">

    {/* LOGO */}
    <div
      onClick={() => navigate("/customer/home")}
      className="text-2xl font-bold cursor-pointer whitespace-nowrap"
    >
      ShopX
    </div>

    {/* LOCATION */}
    <div className="cursor-pointer text-sm whitespace-nowrap">
      <p className="text-gray-500">Deliver to</p>
      <p className="font-semibold">Mumbai 400705</p>
    </div>

    {/* SEARCH BAR (KEY FIX) */}
    <div className="flex flex-1">
      {!isPaymentPage && (
  <input
    type="text"
    placeholder="Search products"
    className="w-full px-4 py-2 outline-none" // Added w-full
  />
)}

      <button className="px-5 bg-yellow-400 rounded-r-md hover:bg-yellow-500">
        🔍
      </button>
    </div>

    {/* LANGUAGE */}
    <div className="cursor-pointer text-sm whitespace-nowrap">
      <p className="font-semibold">EN</p>
    </div>

    {/* ACCOUNT */}
    <div
  className="relative cursor-pointer text-sm whitespace-nowrap"
  onMouseEnter={() => setOpenAccount(true)}
  onMouseLeave={() => setOpenAccount(false)}
>
  <p className="text-gray-500">Hello, Aryan</p>
  <p className="font-semibold">Account & Lists</p>

  {/* Acoount DROPDOWN */}
  {openAccount && (
    <div className="absolute right-0 top-10 w-48 bg-white shadow-lg border rounded-md z-50">
      <ul className="text-sm">
        <li
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => navigate("/customer/profile")}
        >
          My Profile
        </li>

        <li
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => navigate("/customer/orders")}
        >
          My Orders
        </li>

        <li
          className="px-4 py-2 hover:bg-gray-100 text-red-600"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </li>
      </ul>
    </div>
  )}
</div>

    {/* ORDERS */}
    <div className="cursor-pointer text-sm whitespace-nowrap">
      <p className="text-gray-500">Returns</p>
      <p className="font-semibold">& Orders</p>
    </div>

    {/* CART */}
    {/* CART */}
<div
  className="relative cursor-pointer"
  onClick={() => navigate("/customer/cart")}
>
  <span className="text-lg">🛒</span>

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</div>



  </div>
</nav>

  );
}

export default Navbar;

//import { useLocation } from "react-router-dom";//
import ProductDetails from "./pages/customer/ProductDetails";
import Payment from "./pages/customer/Payment";
import Checkout from "./pages/customer/Checkout";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";

import CustomerLayout from "./layouts/CustomerLayout";
import SellerLayout from "./layouts/SellerLayout";

import CustomerHome from "./pages/customer/Home";
import Cart from "./pages/customer/Cart";

import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
 // const location = useLocation();

  //const hideNavbarRoutes = ["/login", "/register"];//
  //const hideNavbar = hideNavbarRoutes.includes(location.pathname);//

  return (
    <>
       

      <Routes>
  {/* ROOT */}
  <Route path="/" element={<Login />} />

  {/* AUTH */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* CUSTOMER */}
  <Route path="/customer" element={<CustomerLayout />}>
    <Route path="home" element={<CustomerHome />} />
    <Route path="cart" element={<Cart />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="payment" element={<Payment />} />
    <Route path="product/:id" element={<ProductDetails />} />
  </Route>

  {/* SELLER */}
  <Route path="/seller" element={<SellerLayout />}>
    <Route path="dashboard" element={<SellerDashboard />} />
    <Route path="products" element={<SellerProducts />} />
  </Route>

  {/* LEGACY / PROTECTED */}
  <Route
    path="/home"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
</Routes>


    </>
  );
}


export default App;

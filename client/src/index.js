import { AddressProvider } from "./context/AddressContext";
import { CartProvider } from "./context/CartContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <AuthProvider>
    <CartProvider>
      <AddressProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AddressProvider>
    </CartProvider>
  </AuthProvider>
);

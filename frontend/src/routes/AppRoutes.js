/*
 * eShop Project
 * AppRoutes
 *
 * Description:
 * Defines all the routing paths for the application.
 * Maps URLs to the corresponding page or component.
 *
 * License:
 * MIT License
 */

import { Routes, Route } from "react-router-dom";

// Components
import { Carts, CategoryDetail } from "../components";

// Pages
import {
  Home,
  Shop,
  Terms,
  Policy,
  OrderHistory,
  Admin,
  Login,
  Register,
  Reset,
  Verifiemail,
  NotFound,
  Checkout,
  Account,
  CheckoutSuccess,
  ProductDetail,
  Wishlist,
  Confirmemail,
} from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/eshop" element={<Home />} />

      {/* Shop & Product Routes */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/categoryDetail/:id" element={<CategoryDetail />} />

      {/* User Account & Orders */}
      <Route path="/account" element={<Account />} />
      <Route path="/order-history" element={<OrderHistory />} />

      {/* Cart & Checkout */}
      <Route path="/cart" element={<Carts />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/verifiemail" element={<Verifiemail />} />
      <Route path="/confirmemail" element={<Confirmemail />} />

      {/* Wishlist */}
      <Route path="/wishlist" element={<Wishlist />} />

      {/* Policies & Terms */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/policy" element={<Policy />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<Admin />} />

      {/* Catch-all for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

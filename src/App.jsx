import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CommonPage from "./Pages/CommonPage";
import HomePage from "./Pages/HomePage";
import ProductList from "./Pages/ProductList";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrdersPage from "./Pages/OrdersPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import PageNotFound from "./Pages/PageNotFound";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<CommonPage />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

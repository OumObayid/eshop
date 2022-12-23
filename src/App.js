import { BrowserRouter, Route, Routes } from "react-router-dom";
//components
import { Header, Footer, Carts } from "./components";
//pages
import {
  Home,
  Shop,
  Services,
  Terms,
  Policy,
  Contact,
  OrderHistory,
  Admin,
  Login,
  Register,
  Reset,
  Verifiemail,
  NotFound,
  Checkout,
  ProductDetail,
} from "./pages";

import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { cartIsVisible } from "./redux/cartUiSlice";

function App() {
  const showCart = useSelector(cartIsVisible);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      {showCart && <Carts />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/eshop" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/verifiemail" element={<Verifiemail />} />
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/not-Found" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
//components
import {
  Header,
  Footer,
  Carts,
  CategoryDetail,
  ProductDetail,  
} from "./components";
//pages
import {
  Home,
  Shop,
  Services,
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
} from "./pages";
//toast
import { ToastContainer } from "react-toastify";
//data
import { useSelector } from "react-redux";
import { cartIsVisible } from "./redux/cartUiSlice";

function App() {
  //to show or hide cart
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
          <Route path="/CategoryDetail/:id" element={<CategoryDetail />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/verifiemail" element={<Verifiemail />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />     
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

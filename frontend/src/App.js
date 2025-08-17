/*
 * eShop Project
 * App
 *
 * Description:
 * Main entry point of the React application.
 * Wraps the app with BrowserRouter for routing.
 * Displays header, footer, cart modal, and page content.
 * Integrates Toast notifications.
 *
 * License:
 * MIT License
 */

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

import { Header, Footer, Carts } from "./components";
import { cartIsVisible } from "./redux/cartUiSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // get cart visibility state from Redux
  const showCart = useSelector(cartIsVisible);

  return (
    <BrowserRouter>
      {/* Toast notifications */}
      <ToastContainer />
      
      <div className="app-container">
        {/* Header */}
        <Header />
        
        {/* Cart modal */}
        {showCart && <Carts />}
        
        {/* Main content */}
        <div className="content-wrapper">
          <AppRoutes />
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

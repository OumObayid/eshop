/*
 * eShop Project
 * Wishlist Component
 *
 * Description:
 * Displays the user's wishlist page.
 * Redirects unauthenticated users to login.
 * Shows a list of wishlist items or an empty state with a prompt to shop.
 * Integrates AccountMenu and RatedProducts components.
 *
 * License:
 * MIT License
 */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { AccountMenu, Helmet, RatedProducts } from "../../components";
import WishItem from "./WishItem";
import { dataWishs } from "../../redux/wishSlice";
import imgWish from "../../assets/wish.png";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

// Wishlist page component
const Wishlist = () => {
  const listwishs = useSelector(dataWishs); // Get wishlist from Redux
  const navigate = useNavigate();

  // Check auth state on mount
  useEffect(() => {    
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // Redirect if not logged in
      } else console.log("user :", user);
    });
  }, [navigate]);

  return (
    <Helmet title="wishlist">
      <section id="wishlist">
        <Row>
          {/* Account menu sidebar */}
          <Col lg="3" md="3" sm="12" xs="12">
            <AccountMenu active="wishlist" />
          </Col>

          {/* Main wishlist content */}
          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>
              Your wishlist
            </p>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />

            {/* Wishlist items or empty state */}
            <div className="me-3">
              {listwishs.length === 0 ? (
                <div className="text-center">
                  <p>
                    <img src={imgWish} width="200" alt="no wish" />
                  </p>
                  <span className="text-center fs-2 mt-5">It is empty here.</span>
                  <p className="text-center mt-5">
                    Browse our products and discover <br />
                    our best offers!
                  </p>
                  <Link
                    to="/shop"
                    className="btn btn-warning mt-2 fs-5"
                  >
                    START SHOPPING
                  </Link>
                </div>
              ) : (
                <>
                  {listwishs.map((item, index) => (
                    <div key={index}>
                      <WishItem item={item} key={index} />
                      <hr
                        style={{
                          backgroundColor: "#434341",
                          width: "100%",
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Recommended products section */}
            <RatedProducts />
          </Col>
        </Row>
      </section>
    </Helmet>
  );
};

// Export Wishlist component
export default Wishlist;

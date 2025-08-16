import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col,Row } from "reactstrap";
import { AccountMenu, Helmet, RatedProducts } from "../../components";
 import WishItem from "./WishItem";
import { dataWishs } from "../../redux/wishSlice";
import imgWish from "../../assets/wish.png"
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
const Wishlist = () => {
  const listwishs = useSelector(dataWishs);
   const navigate = useNavigate();
 useEffect(() => {    
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else console.log("user :", user);
    });
  }, [navigate]);

  return (
    <Helmet title="wishlist">
      <section className="" id="wishlist">
        <Row>
          <Col lg="3" md="3" sm="12" xs="12">
            <AccountMenu active="wishlist" />
          </Col>
          {/* -----show informations read only--- */}
          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>
              Your wishlist
            </p>
            {/* informations read only */}
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
            {/* list of wishlist */}
           
            <div className="  me-3 ">
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
                <Link to="/shop"
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
          <RatedProducts />
          </Col>
        </Row>
      </section>
    </Helmet>
  );
};

export default Wishlist;

import React from 'react'
import { Col, ListGroup, Row } from 'reactstrap'
import { AccountMenu, Helmet } from '../../components'

const Wishlist = () => {
  return (
    <Helmet title="wishlist">
    <section className="" id="wishlist">
      <Row className=" ">
        <AccountMenu active="wishlist" />
        {/* -----show informations read only--- */}
        <Col lg="9" md="9" sm="12" xs="12">
          <p className="h2" style={{ color: "#F49934" }}>
            Your wishlist
          </p>
          {/* informations read only */}
          <hr style={{ backgroundColor: "#434341", width: "100%" }} />
          {/* list of wishlist */}
          <ListGroup>
              <div className="cart__item-list border">                
                {/* {wishlist.length !== 0 ? (
                  wishlist.map((item, index) => (
                    <div key={index}>
                      <WishlistItem item={item} key={index} />
                      <hr
                        style={{
                          backgroundColor: "#434341",
                          width: "97%",
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <h4 className="text-center my-5">No Order did by you</h4>
                )} */}
              </div>
            </ListGroup>
        </Col>
      </Row>
    </section>
    </Helmet>
  )
}

export default Wishlist
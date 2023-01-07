import React from 'react'
import { Col, Row } from 'reactstrap'
import { AccountMenu, Helmet } from '../../components'

const Wishlist = () => {
  return (
    <Helmet title="wishlist">
    <section className="orders" id="orders">
      <Row className=" ">
        <AccountMenu active="wishlist" />
        {/* -----show informations read only--- */}
        <Col lg="8" md="8" sm="12" xs="12" className="border">
          <p className="h2" style={{ color: "#F49934" }}>
            Your wishlist
          </p>
          {/* informations read only */}
          <hr style={{ backgroundColor: "#434341", width: "100%" }} />
         
        </Col>
      </Row>
    </section>
    </Helmet>
  )
}

export default Wishlist
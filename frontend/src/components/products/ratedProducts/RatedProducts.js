/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * RatedProducts component displays the top 10 highest rated products.
 * It fetches products from the Redux store, calculates their average rating
 * from individual rating counts, sorts them, and renders them in a slider.
 *
 * Usage:
 * <RatedProducts />
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { Row, Col } from "reactstrap";
import { SlideProduct, CardProduct } from "../../../components";
import WellRatedProducts from "../../../assets/Well-Rated-Products.png";
import { dataProducts } from "../../../redux/dataSlice";
import { useSelector } from "react-redux";

const RatedProducts = () => {
  // Get all products from Redux store
  const products = useSelector(dataProducts);

  // Create a copy for sorting
  const arrayForSort = [...products];

  // Sort products by average rating
  const sortProducts = arrayForSort.sort((a, b) => {
    const ratingA =
      (a.rating1 * 1 + a.rating2 * 2 + a.rating3 * 3 + a.rating4 * 4 + a.rating5 * 5) /
      (a.rating1 + a.rating2 + a.rating3 + a.rating4 + a.rating5);

    const ratingB =
      (b.rating1 * 1 + b.rating2 * 2 + b.rating3 * 3 + b.rating4 * 4 + b.rating5 * 5) /
      (b.rating1 + b.rating2 + b.rating3 + b.rating4 + b.rating5);

    return ratingA < ratingB ? 1 : ratingA > ratingB ? -1 : 0;
  });

  // Take the top 10 highest rated products
  const productRatedTop = sortProducts.slice(0, 10);

  return (
    <div className="container ratedmargTop">
      {/* Header image */}
      <div className="text-center">
        <img src={WellRatedProducts} style={{ height: "4.7rem" }} alt="Well Rated Products" />
      </div>

      {/* Separator line */}
      <div className="d-flex justify-content-center">
        <hr
          style={{
            position: "relative",
            top: "-1.25rem",
            backgroundColor: "#434341",
            width: "100%",
          }}
        />
      </div>

      {/* Products slider */}
      <Row className="d-flex justify-content-between mb-5">
        <SlideProduct>
          {productRatedTop.map((product, index) => (
            <Col lg="3" md="3" sm="12" xs="12" className="mb-3" key={index}>
              <CardProduct item={product} />
            </Col>
          ))}
        </SlideProduct>
      </Row>
    </div>
  );
};

export default RatedProducts;

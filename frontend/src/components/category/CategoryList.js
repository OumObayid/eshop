/*
 * eShop Project - CategoryList Component
 * Description: Displays a list of all categories available in the store.
 * Renders a header image, a divider line, and each category using the Category component.
 * Accepts a `categorys` prop containing an array of category objects.
 *
 * Copyright (c) 2025 Oumaima El Obayid
 * This file is part of the eShop application.
 * Licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import Category from "./Category";
import { Row, Col } from "reactstrap";
import allcategorys from "../../assets/allcategorys.png";

const CategoryList = ({ categorys }) => {
  return (
    <>
      {/* Header image for "All Categories" */}
      <div className="text-center">
        <img
          src={allcategorys}
          style={{ height: "5rem", transform: "rotate(-1deg)" }}
          alt="all categories"
        />
      </div>

      {/* Divider line */}
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

      {/* List of categories */}
      <Row className="d-flex justify-content-between mb-5">
        {categorys.map((category) => (
          <Col lg="6" md="6" sm="12" xs="12" className="mb-3" key={category.id}>
            <Category category={category} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryList;

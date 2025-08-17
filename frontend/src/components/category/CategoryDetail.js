/*
 * eShop Project - CategoryDetail Component
 * Description: Displays detailed information about a specific category.
 * Shows the category name, description, and lists all products belonging to that category.
 * Fetches category and product data from Redux store and uses the category ID from URL params.
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

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { datacategorys, dataProducts } from "../../redux/dataSlice";
import Helmet from '../Helmet/Helmet';
import CardProduct from '../products/cardProduct/CardProduct';
import "./Category.css";

const CategoryDetail = () => {
  const { id } = useParams(); // Get category ID from URL

  // Get category data from Redux store
  const categorys = useSelector(datacategorys);
  const categoryId = categorys.filter((item) => item.id === id);
  const category = categoryId[0];

  // Get all products and filter by category name
  const data = useSelector(dataProducts);
  const productsCat = data.filter((item) => item.category === category.categoryName);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title={category.categoryName}>
      <div className="pt-5 d-flex justify-content-center row fs-5">
        {/* Category Title */}
        <h1 className='text-center'>{category.categoryName}</h1>

        {/* Divider line */}
        <hr className='mt-3' style={{ backgroundColor: "#E99734", width: "100%" }} />

        {/* Category description */}
        <p className='txtDesc'>{category.descCat}</p>

        <hr className='mb-5' style={{ backgroundColor: "#E99734", width: "100%" }} />

        {/* Products list */}
        <div className="col-md-9 p-0">
          <Row className="d-flex justify-content-between row">
            {productsCat.map((item) => (
              <Col
                lg="3"
                md="4"
                sm="6"
                xs="6"
                className="mb-4"
                key={item.id}
              >
                <CardProduct item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Helmet>
  );
};

export default CategoryDetail;

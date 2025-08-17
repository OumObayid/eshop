/*
 * eShop Project - Category Component
 * Description: Represents a single product category card.
 * Each card displays the category name, image, and a short title.
 * Clicking on the card navigates the user to the detailed view of the selected category.
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

import { Link } from "react-router-dom";
import "./Category.css";

const Category = ({ category }) => {
  return (
    // Category card container
    <div className="m-1 card p-1">
      {/* Link to category detail page */}
      <Link
        to={`/categoryDetail/${category.id}`}
        className="justify-content-center row"
      >
        {/* Category name */}
        <p className="text-center fs-2 h-25 m-0">
          {category.categoryName}
        </p>

        {/* Category image */}
        <img
          src={category.imgCat}
          className="cat m-0"
          alt={category.categoryName}
        />

        {/* Category short title */}
        <p className="text-center fs-4 h-25 m-3">
          {category.titleCat}
        </p>
      </Link>
    </div>
  );
};

export default Category;

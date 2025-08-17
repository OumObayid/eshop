/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * ProductSearch component provides search and sort functionality for products.
 * It allows switching between two views, shows product count, and
 * handles input for searching by name or category.
 *
 * Props:
 * - actions: array of functions and values [
 *     countP,           // number of products
 *     searchString,     // current search string
 *     handlSearch,      // function to handle search input
 *     handleSort,       // function to handle sort selection
 *     valueSelectSort,  // current selected sort option
 *     NodisplayList,    // function to switch to grid view
 *     displayList       // function to switch to list view
 *   ]
 *
 * Usage:
 * <ProductSearch actions={[countP, searchString, handlSearch, handleSort, valueSelectSort, NodisplayList, displayList]} />
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import view1 from "../../assets/view1.webp"; // Grid view icon
import view2 from "../../assets/view2.webp"; // List view icon

const ProductSearch = (props) => {
  // Destructure actions array from props
  const [
    countP,
    searchString,
    handlSearch,
    handleSort,
    valueSelectSort,
    NodisplayList,
    displayList,
  ] = [...props.actions];

  return (
    <div className="d-flex justify-content-between row m-0 p-0">
      {/* View toggle buttons and product count */}
      <div className="col-md-4 d-flex justify-content-center hidden-view row mt-1">
        <img
          src={view1}
          className="imgView"
          role="button"
          alt="Grid view"
          onClick={NodisplayList} // Switch to grid view
        />
        <img
          src={view2}
          className="imgView"
          role="button"
          alt="List view"
          onClick={displayList} // Switch to list view
        />
        <p className="col mt-2 fs-5">
          <span className="fw-bold">{countP}</span> {/* Display product count */}
        </p>
      </div>

      {/* Search input */}
      <div className="col-md-4 col-sm-12 ms-1 m-0 mb-sm-3 mb-3 row justify-content-end pe-0">
        <span className="col-md-4 col-sm-3 col-3 text-end mt-2 fs-5 fw-bold">
          Search by :
        </span>
        <div className="col-md-7 col-sm-9 col-9 me-md-4">
          <input
            className="form-control field fs-5 rounded"
            type="search"
            placeholder="name or category"
            aria-label=".form-control-lg example"
            value={searchString} // Current search value
            onChange={handlSearch} // Handle input change
          />
        </div>
      </div>

      {/* Sort selection */}
      <div className="col-md-4 col-sm-12 ms-1 m-0 mb-sm-3 mb-3 row justify-content-end pe-0">
        <span className="col-md-4 col-sm-3 col-3 text-end mt-2 fs-5 fw-bold">
          Sort by :
        </span>
        <div className="col-md-7 col-sm-9 col-9">
          <select
            className="form-select field m-0 fs-5 rounded"
            aria-label=".form-select-lg example"
            onChange={handleSort} // Handle sort option change
            value={valueSelectSort} // Current selected sort
          >
            <option value="0">latest</option>
            <option value="1">Lowest price</option>
            <option value="2">Highest price</option>
            <option value="3">A - Z</option>
            <option value="4">Z - A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;

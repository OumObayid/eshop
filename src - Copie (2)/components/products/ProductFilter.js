import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import MultiRangeSlider from "multi-range-slider-react";
import "./ProductFilter.css";

const ProductFilter = (props) => {
  const [
    getAllCat,
    getLaptop,
    getElectro,
    getPhone,
    getFashion,
    clearFilter,
    changeRange,
    setRange,
    rangeMinVal,
    rangeMaxVal,
    selectBrand,
    valueSelectBrand,
    rangeValInit,
  ] = [...props.actions];
  return (
    <div className="list-group col-lg-3 pe-lg-5 mb-5">
      <div
        className="list-group-item  fs-2 border-0 fw-bold"
        aria-current="true"
      >
        Category
      </div>
      <button
        className="list-group-item list-group-item-action border-top-0 border-start-0 border-end-0 border-2 "
        onClick={getAllCat}
      >
        <MdKeyboardArrowRight />
        All
      </button>
      <button
        className="list-group-item list-group-item-action border-top-0 border-start-0 border-end-0 border-2 "
        onClick={getLaptop}
      >
        <MdKeyboardArrowRight />
        Laptop
      </button>
      <button
        className="list-group-item list-group-item-action border-top-0 border-start-0 border-end-0 border-2 "
        onClick={getElectro}
      >
        <MdKeyboardArrowRight />
        Electronic
      </button>
      <button
        className="list-group-item list-group-item-action border-top-0 border-start-0 border-end-0 border-2 "
        onClick={getPhone}
      >
        <MdKeyboardArrowRight />
        Phone
      </button>
      <button
        className="list-group-item list-group-item-action border-top-0 border-start-0 border-end-0 border-2 "
        onClick={getFashion}
      >
        <MdKeyboardArrowRight />
        Fashion
      </button>
      <div
        className="list-group-item  fs-2 border-bottom-0 border-start-0 border-end-0 fw-bold"
        aria-current="true"
      >
        Brand
      </div>
      <div className="mb-3">
        <select
          className="form-select form-select-lg"
          onChange={selectBrand}
          value={valueSelectBrand}
        >
          <option value="0">All</option>
          <option value="1">Lenovo</option>
          <option value="2">HP</option>
          <option value="3">Hisense</option>
          <option value="4">LG</option>
          <option value="5">Amani</option>
          <option value="6">Adidas</option>
          <option value="7">Tecno</option>
          <option value="8">Umidigi</option>
          <option value="9">Samsung</option>
          <option value="10">Xioomi</option>
          <option value="11">Itel</option>
        </select>
      </div>
      <div
        className="list-group-item  fs-2 border-0 fw-bold"
        aria-current="true"
      >
        Price
      </div>
      <div
        className="list-group-item border-bottom-0 border-start-0 border-end-0"
        aria-current="true"
      >
        <label className="form-label pb-2 d-flex justify-content-between justify-item-between ">
          <div className="align-middle  py-1 d-flex justify-content-between ">
            <div className="me-3">
              Min: <span className="fw-bold">{rangeMinVal}</span>
            </div>
            <div>
              Max: <span className="fw-bold">{rangeMaxVal}</span>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning btn-circle align-middle py-1 fw-bold"
            onClick={setRange}
          >
            Ok
          </button>
        </label>
        <MultiRangeSlider
          className="border border-0 my-5 "
          min={rangeValInit.min}
          max={rangeValInit.max}
          step={1}
          minValue={rangeValInit.min} 
          maxValue={rangeValInit.max}
          style={{
            border: "none",
            boxShadow: "none",
            padding: "0",
            backgroundColor: "#9fe5e1",
          }}
          label="false"
          ruler="false"
          barInnerColor="#848484"  
          onChange={changeRange}
        />
      </div>
      <div
        className="list-group-item border-bottom-0 border-start-0 border-end-0 "
        aria-current="true"
      >
        <button
          type="button"
          className="btn btn-warning fs-5"
          onClick={clearFilter}
        >
          Clear filters
        </button>
        <hr />
      </div>
    </div>
  );
};

export default ProductFilter;

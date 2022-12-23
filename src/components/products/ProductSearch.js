import React from 'react'
import { FiSearch } from "react-icons/fi";
import { IconContext } from "react-icons";
import view1 from "../../assets/view1.png";
import view2 from "../../assets/view2.png";

const ProductSearch = (props) => {
    const [countP,searchString,handlSearch,handleSort,valueSelectSort,NodisplayList, displayList] = [...props.actions]

  return (
    <div className="d-flex justify-content-between row m-0 p-0">
              <div className=" col-md-4 d-flex justify-content-center hidden-view  row mt-1 ">
                <img src={view1} className=" imgView  " role="button" alt="..." onClick={NodisplayList}/>
                <img src={view2} className=" imgView  "role="button" alt="..." onClick={displayList}/>
                <p className="col mt-2 fs-5 ">
                  <span className="fw-bold ">{countP}</span> 
                </p>
              </div>
  
              <div className="col-md-4 col-sm-12 mb-sm-3 mb-3 d-flex">
              <span className="col-md-4 col-sm-3 col-3 text-end mt-2 me-2 fs-5  fw-bold">
                  Search by :
                </span>
                <div className="input-group">
                  <input
                    className="form-control  border fs-5 rounded"
                    type="search"
                    placeholder="name or category"
                    aria-label=".form-control-lg example"
                    value={searchString}
                    onChange={handlSearch}
                  />
               
                </div>
              </div>
  
              <div className="col-md-4 row justify-content-end  pe-0 ">
                <span className="col-md-4 col-sm-3 col-3 text-end mt-2  fs-5 fw-bold ">
                  Sort by :
                </span>
                <div className="col-md-7 col-sm-9 col-9 p-0 me-md-4 ">
                  <select
                    className="form-select col col-2 fs-5 rounded"
                    aria-label=".form-select-lg example"
                    onChange={handleSort}
                    value={valueSelectSort}
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
  )
}

export default ProductSearch
import React from "react";

const Search = () => {
  return (
    <div>
      <div className="filter-list">
        <form>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              onChange={this.filterList}
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Search;

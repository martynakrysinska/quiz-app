import React from "react";

const SelectCategory = props => {
  if (props.mode !== "start") {
    return (
      <div className="col-10 p-3 d-inline-block">
        <h2 className="text-center">Choose your category</h2>
        <div className="centerSelect">
          <select
            className="form-control form-control-lg w-100 text-center"
            value={props.category}
            onChange={e => props.getCategory(e)}
          >
            <option checked value="">
              Select category
            </option>
            {props.categories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default SelectCategory;

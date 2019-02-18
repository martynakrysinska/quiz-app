import React from "react";

const CategoryImage = props => {
  if (props.category) {
    return (
      <div className="col-10 mt-1 mb-4 p-3 d-inline-block">
        <img
          className="centerSelect"
          width="150px"
          src={require(`./images/${props.category}.png`)}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default CategoryImage;

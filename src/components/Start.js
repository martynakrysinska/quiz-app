import React from "react";
const arrow = require("./images/flash-left.png");

const Start = props => {
  const mode = props.mode;
  if (mode === "start") {
    return (
      <div className="col-12 row justify-content-center">
        <div className="col-5 m-3 p-3 justify-content-center text-center">
          <img width="70px" src={arrow} />
          <br />
          <p className="start-p">This will generate a quiz.</p>
        </div>
        <div className="col-5 m-3 p-3 justify-content-center text-center">
          <img width="70px" src={arrow} />
          <br />
          <p className="start-p">This will generate one question.</p>
        </div>

        <div className="col-5 m-3 p-3 text-center">
          <span className="counterSpan">{props.categories.length}</span>
          <p className="counterP">categories</p>
        </div>
        <div className="col-5 m-3 p-3 text-center">
          <span className="counterSpan">{props.questionsCounter}</span>
          <p className="counterP">questions</p>
        </div>
      </div>
    );
  } else return null;
};

export default Start;

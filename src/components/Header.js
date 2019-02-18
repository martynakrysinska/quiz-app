import React from "react";

const lightbulb = require("./images/light-bulb.png");

const Header = props => (
  <div
    onClick={() => props.setModeStart()}
    className="jumbotron text-center justify-content-center"
  >
    <img width="60px" src={lightbulb} />
    <h1>Quiz App</h1>
  </div>
);

export default Header;

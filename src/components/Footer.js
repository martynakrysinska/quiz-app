import React from "react";

const Footer = props => {
  return (
    <footer className="p-4 text-center footer">
      <a href="https://opentdb.com/" target="_blank">
        <img id="footer-img" src={require("./images/trivialogo.png")} />
      </a>
      <br />
      <a href="https://github.com/martynakrysinska" target="_blank">
        2019 <i className="fab fa-github" /> Martyna Krysinska
      </a>
    </footer>
  );
};

export default Footer;

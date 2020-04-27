import React, { useEffect } from "react";

import "./styles.scss";

const Header = () => {
  useEffect(() => {
    const bgColor = localStorage.getItem("bg-color") || "white";
    changeBackground(bgColor);
  }, []);
  const changeBackground = (color) => {
    localStorage.setItem("bg-color", color);
    switch (color) {
      case "orange":
        document.body.classList.add("orange-bg");
        document.body.classList.remove("red-bg");
        document.body.classList.remove("blue-bg");
        break;
      case "red":
        document.body.classList.add("red-bg");
        document.body.classList.remove("orange-bg");
        document.body.classList.remove("blue-bg");
        break;
      case "blue":
        document.body.classList.add("blue-bg");
        document.body.classList.remove("red-bg");
        document.body.classList.remove("orange-bg");
        break;
      default:
        document.body.classList.remove("blue-bg");
        document.body.classList.remove("red-bg");
        document.body.classList.remove("orange-bg");
    }
  };

  return (
    <div className="header">
      <h1 className="brand">ADDI-Chat</h1>
      <div className="colors">
        <span
          className="color orange"
          onClick={() => changeBackground("orange")}
        ></span>
        <span
          className="color red"
          onClick={() => changeBackground("red")}
        ></span>
        <span
          className="color blue"
          onClick={() => changeBackground("blue")}
        ></span>
        <span
          className="color white"
          onClick={() => changeBackground("white")}
        ></span>
      </div>
    </div>
  );
};

export default Header;

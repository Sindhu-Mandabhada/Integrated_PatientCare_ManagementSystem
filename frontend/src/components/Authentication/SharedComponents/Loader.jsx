import React from "react";
import "./Loader.css";

function Loader({
  text = "Loading...",
  fullScreen = false
}) {
  return (
    <div
      className={`loader-container ${
        fullScreen ? "loader-fullscreen" : ""
      }`}
    >
      <div className="loader-spinner"></div>

      {text && (
        <p>{text}</p>
      )}
    </div>
  );
}

export default Loader;
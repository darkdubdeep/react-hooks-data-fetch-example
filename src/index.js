import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./App";
import SunSchedule from "./SunSchedule";
function Root() {
  return (
    <div className="Root">
      <App />
      <SunSchedule />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);

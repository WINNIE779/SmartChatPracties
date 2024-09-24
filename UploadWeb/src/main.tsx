import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./app";
import ReactDOM from "react-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById("root")
);

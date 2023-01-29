import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./assets/styles/reset.css";
import "./assets/styles/styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import { NotificationProvider } from "./context/NotificationContext";
import { NotificationPreferencesProvider } from "./context/NotificationPreferencesContext";
import "./styles/base.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NotificationPreferencesProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </NotificationPreferencesProvider>
  </BrowserRouter>
);

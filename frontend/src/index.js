import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AppProvider } from "./context/appContext";
<<<<<<< HEAD
import { SocketProvider } from "./context/socketContext";
import "./i18n";
=======
>>>>>>> 271f4697c73514c20968e78d91e9908bb6054075

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

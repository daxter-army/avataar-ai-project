import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import CarouselContextProvider from "./context/carouselContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarouselContextProvider>
      <App />
    </CarouselContextProvider>
  </React.StrictMode>
);

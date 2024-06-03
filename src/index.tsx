import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "./variable.scss";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./redux/store";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </Provider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

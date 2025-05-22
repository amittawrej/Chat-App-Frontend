import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// http://localhost:3000/
// https://chat-app-backend-5n7n.onrender.com
export const server="http://localhost:3000"

ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  
);

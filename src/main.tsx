import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

// this is the entry point
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Toaster
          gutter={8}
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
            style: {
              background: "#0E1330",
              color: "#fff",
            },
          }}
        />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);

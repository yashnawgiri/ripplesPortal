import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

// Add Zendesk script to head
const script = document.createElement("script");

script.id = "ze-snippet";
script.src =
  "https://static.zdassets.com/ekr/snippet.js?key=ff935203-968c-4bb2-ba8c-325d7e5e644e";
document.head.appendChild(script);

// this is the entry point
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Provider>
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
        </Provider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);

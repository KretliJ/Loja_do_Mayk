import React from "react";
import ReactDOM from "react-dom/client";
import { RootLayout } from "./RootLayout";
import { App } from "./App"; // seu componente principal com as rotas/pages
import "./globals.css";

console.log("Aplicação React inicializada");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootLayout>
      <App />
    </RootLayout>
  </React.StrictMode>
);

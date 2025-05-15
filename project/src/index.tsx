import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecuperarSenha } from "./screens/RecuperarSenha";
import { Login } from "./screens/Login";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <RecuperarSenha />
      <Login />
    </BrowserRouter>
  </StrictMode>,
);
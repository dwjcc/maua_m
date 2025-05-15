import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecuperarSenha } from "./screens/RecuperarSenha";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <RecuperarSenha />
    </BrowserRouter>
  </StrictMode>,
);
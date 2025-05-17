import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecuperarSenha } from "./screens/RecuperarSenha";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { Cadastro } from "./screens/Cadastro";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        <Route path="/Cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
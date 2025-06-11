import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecuperarSenha } from "./screens/RecuperarSenha";
import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { Cadastro } from "./screens/Cadastro";
import { HomeScreen } from "./screens/HomeScreen";
import { FilaVirtual } from "./screens/FilaVirtual";
import { Perfil } from "./screens/Perfil";
import { Itinerarios } from "./screens/Itinerarios";
import { FaqContato } from "./screens/FaqContato/FaqContato";
import { NotificationScreen } from "./screens/Notificações/NotificationScreen";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/HomeScreen" element={<HomeScreen />} />
        <Route path="/FilaVirtual" element={<FilaVirtual />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Itinerarios" element={<Itinerarios />} />
        <Route path="/FaqContato" element={<FaqContato />} />
        <Route path="/notificacoes" element={<NotificationScreen />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

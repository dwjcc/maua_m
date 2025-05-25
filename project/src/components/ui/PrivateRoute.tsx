import { Navigate } from "react-router-dom";
import authService from "../../services/authService";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redireciona para login se não estiver autenticado
    return <Navigate to="/Login" />;
  }

  // Se estiver autenticado, renderiza os componentes filhos
  return <>{children}</>;
};

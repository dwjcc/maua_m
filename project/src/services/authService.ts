import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// Interface para resposta do JWT
interface JwtResponse {
  token: string;
  type: string;
  id: number;
  email: string;
}

// Interface para armazenar usuário local
interface UserData {
  id: number;
  email: string;
  token: string;
}

// Função de login
const login = async (email: string, password: string): Promise<UserData> => {
  const response = await axios.post<JwtResponse>(API_URL + "login", {
    email,
    password,
  });

  if (response.data.token) {
    const userData: UserData = {
      id: response.data.id,
      email: response.data.email,
      token: response.data.token,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    return userData;
  }

  throw new Error("Login falhou");
};

// Função de registro
const register = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<any> => {
  return axios.post(API_URL + "register", {
    email,
    password,
    confirmPassword,
  });
};

// Função de logout
const logout = (): void => {
  localStorage.removeItem("user");
};

// Obter usuário atual
const getCurrentUser = (): UserData | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Verificar se o usuário está autenticado
const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
};

export default authService;

import { createContext, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

interface SignInData { 
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: SignInData | null,
  token: string | null,
  isAuthenticated: boolean;
  setUser: (user: SignInData) => void;
  signIn: (user: SignInData) => Promise<void>;
  signOut: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SignInData | null>({} as SignInData)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const loadingStoragedData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        console.log("storageUser: " + storageUser);
        console.log("storageToken: " + storageToken);
      }
    };
    loadingStoragedData();
  }, []);

  async function signIn ({email, password}: SignInData) {
    const response = await api.post<string>('/authenticate', { email, password });
    
    try {
      const token = response.data;

      console.log("Token: "+token);
      
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('@Auth:token', token);
      localStorage.setItem('@User:user', JSON.stringify(response.config.data).replace(/\\/g, ''));

      setToken(token);
      setUser(response.config.data);
      setIsAuthenticated(true);

    } catch (error) {
      alert("E-mail ou senha inválidos");
      throw new Error("Erro ao fazer login");
    }
  }


  const signOut = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    return <Navigate to="/"/>;
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser,  signIn, signOut, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
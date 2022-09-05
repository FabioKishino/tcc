import { createContext, ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  username: string;
  email: string;
}

interface SignInData { 
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: SignInData | null,
  signIn: (user: SignInData) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SignInData | null>({} as SignInData)


  useEffect(() => {
    const loadingStoragedData = () => {
      const storageUser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadingStoragedData();
  }, []);

  async function signIn ({email, password}: SignInData) {
    const response = await api.post('/authenticate', { email, password });
    
    try {
      const { token } = response.data;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      localStorage.setItem('@Auth:token', token);
      localStorage.setItem('@User:user', JSON.stringify(response.config.data));

    } catch (error) {
      alert("E-mail ou senha inválidos");
      throw new Error("Erro ao fazer login");
    }
  }

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/"/>;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
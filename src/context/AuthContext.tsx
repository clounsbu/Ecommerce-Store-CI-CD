import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  use,
} from "react";

//Detects when the user logs in or out and updates the user state accordingly
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "../firebaseConfig";

interface AuthContextType {
  user: null | User;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: User) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

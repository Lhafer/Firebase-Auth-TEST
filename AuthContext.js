// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setLogged(true);
        setUser(authUser);
      } else {
        setLogged(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    isLoggedIn,
    setUser,
    setLogged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out", error);
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLogged] = useState(false);
  const [userDB, setDB] = useState(null);
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setLogged(true);
        setUser(authUser);

        try {
          const firestore = getFirestore();
          const dbCollection = firestore.collection(authUser.email);
          await setDB(dbCollection);
        } catch (e) {
          console.log(e);
        }
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
    logout,
    userDB,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLogged] = useState(false);
  const [colRef, setRef] = useState();
  const [entries, setEntries] = useState();
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  };
  useEffect(() => {
    if (user) {
      const newColRef = collection(db, user.email);
      setRef(newColRef);

      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(newColRef);
          setEntries(querySnapshot.docs.map((doc) => doc.data()));
          console.log(entries);
        } catch (e) {
          console.log("Failed to get entries: " + e);
        }
      };

      fetchData();
    }
  }, [user]);

  const value = {
    user,
    isLoggedIn,
    setUser,
    setLogged,
    logout,
    colRef,
    entries,
    setEntries,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// JournalContext.js
import React, { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";

// Create context element
const JournalContext = createContext();

// Constant to create the context
const JournalProvider = ({ children }) => {
  const { user, userDB } = useAuth();
  const [entries, setEntries] = useState([]);
  const [entCount, setEntCount] = useState(0);
  // Add entry
  const addEntry = async (newEntry) => {
    setEntries([...entries, newEntry]);
    setEntCount(entCount + 1);
    try {
      await db.collection(user.email).doc(entCount).set(newEntry);
    } catch (e) {
      console.log(e);
    }
  };
  const updateEntry = (index, updatedEntry) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = updatedEntry;
    setEntries(updatedEntries);
  };

  return (
    // Use context element provider with desired context
    <JournalContext.Provider
      value={{ addEntry, entries, entCount, updateEntry }}
    >
      {children}
    </JournalContext.Provider>
  );
};

// Corrected useJournal hook
const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
};

export { useJournal, JournalProvider, JournalContext };

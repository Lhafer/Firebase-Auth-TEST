// JournalContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, setDoc } from "firebase/firestore";

// Create context element
const JournalContext = createContext();

// Constant to create the context
const JournalProvider = ({ children }) => {
  const { user, colRef, entries, setEntries } = useAuth();
  const [entCount, setEntCount] = useState(0);

  const addEntry = async (newEntry) => {
    setEntries([...entries, newEntry]);
    try {
      await setDoc(doc(colRef, "Entry:" + entries.length + 1), newEntry);
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
      value={{
        addEntry,
        setEntries,
        setEntCount,
        entries,
        setEntries,
        entCount,
        updateEntry,
      }}
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

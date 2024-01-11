// JournalContext.js
import React, { createContext, useState, useContext } from "react";

//create context element
const JournalContext = createContext();

//constant to create the context
const JournalProvider = ({ children }) => {
  //entries hook
  const [entries, setEntries] = useState([]);

  //add entry
  const addEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
  };

  return (
    //use context elemetn provider with desirec context
    <JournalContext.Provider value={{ entries, addEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
const useJournal = () => {
  const { addEntry, entries } = useContext(JournalContext);
  return { addEntry, entries };
};
export { useJournal, JournalProvider };

import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState("")
    
  return (
    <NoteContext.Provider value={{notes,setNotes, isLoading, setIsLoading, token, setToken}}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;

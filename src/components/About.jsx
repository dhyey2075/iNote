import React from "react";
import {useContext, useState} from 'react';
import NoteContext from "../context/notes/noteContext";
import Navbar from "../components/Navbar.jsx";


const About = () => {
    const {noteState, setNoteState} = useContext(NoteContext);
    const handleClick = () => {
        setNoteState({
          name: 'Codder Dhyey'
        });
    }
  return (
    
    <div>
        <Navbar/>
      I am About
      {/* <button onClick={handleClick}>Change</button> */}
    </div>
  );
};

export default About;

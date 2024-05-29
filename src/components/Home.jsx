import React from "react";
import Navbar from "../components/Navbar.jsx";
import { useContext, useState, useEffect } from "react";
import noteContext from "./../context/notes/noteContext";
import Note from "./Note";

const Home = () => {
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1NDAyMjQ2ZDFmNDRjMTgwN2YzNjljIn0sImlhdCI6MTcxNjgyODc5M30.yYeFxbJ_lB-5xLTXjIBegiap2BRN0DXIpvTcGoIZxnY"
  );
  let con = useContext(noteContext);
  let { notes, setNotes } = con;

  async function fetchNotes() {
    try {
      const res = await fetch(
        "http://localhost:3000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await res.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();

  }, [setNotes]);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {/* <h2>Add Notes</h2> */}
        

        

        <Note />
      </div>
    </>
  );
};

export default Home;

import { useState } from "react";
// import './App.css'
import Navbar from "./components/Navbar.jsx";
import NoteState from "./context/notes/NoteState.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NoteState>
        <div className="container">
        <Navbar />
        </div>
      </NoteState>
    </>
  );
}

export default App;

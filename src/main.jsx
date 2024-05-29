import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <NoteState>

      <RouterProvider router={router} />
 
    </NoteState>
);

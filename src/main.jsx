import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import MainPage from "./components/MainPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
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
  },
  {
    path: "/home",
    element: <Home/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  
<Auth0Provider
    domain="dev-6b3vd1ymu6088typ.us.auth0.com"
    clientId="GbOZVsBjb0KW7NrheFVWjUVwHpUAEscm"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <NoteState>

      <RouterProvider router={router} />

    </NoteState>
  </Auth0Provider>,
);

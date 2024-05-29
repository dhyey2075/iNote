import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import noteContext from "./../context/notes/noteContext";
const Login = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();
  let con = useContext(noteContext);
  let { token, setToken } = con

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name:", name);
    console.log("value:", value);
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      let url = "http://localhost:3000/api/auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.authToken) {
        setToken(json.authToken);
        console.log(token);
        navigate("/");
      }
      setForm({ title: "", description: "", tag: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  return (
    <div>
      <h1 className="mx-4">Sign Up to save your notes on Cloud</h1>
      <br />
      <form className="container" method="POST">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          {/* <div id="emailHelp" className="form-text">
          
        </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputPassword1"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={handleSubmit}
        >
          Login
        </button>
        <Link to="/signup">
          <h4>not have account? Make by clicking here</h4>
        </Link>
      </form>
    </div>
  );
};

export default Login;

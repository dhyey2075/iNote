import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import noteContext from "./../context/notes/noteContext";
const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [exists, setExists] = useState(false);
  const [error, setError] = useState(false);

  let navigate = useNavigate();
  let con = useContext(noteContext);
  localStorage.clear();
  let { token, setToken } = con;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name:", name);
    console.log("value:", value);
    setForm({ ...form, [name]: value });
  };
  useEffect(() => {
    setToken("");
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      console.log(form);
      let url = "http://localhost:3000/api/auth/createuser";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      console.log(json);
      if (json.authToken) {
        setToken(json.authToken);
        console.log(token);
        console.log(json.authToken);
        navigate("/login");
      } else if (json.errors) {
        setError(true);
        setForm({ title: "", description: "", tag: "" });
        navigate("/signup");
      } else if (json.errorEmail) {
        setExists(true);
        setForm({ title: "", description: "", tag: "" });
        navigate("/signup");
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
            minlength="3"
            // value={form.name}
            aria-describedby="emailHelp"
            onChange={handleChange}
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
            // value={form.email}
            id="exampleInputPassword2"
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
            // value={form.password}
            id="exampleInputPassword3"
            minlength="5"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            // value={form.password}
            id="exampleInputPassword4"
            onChange={handleChange}
          />
        </div>
        {error && (
          <h4>
            Name with atleast 3 characters, valid email and password with
            atleast 5 characters is required
          </h4>
        )}
        {exists && <h4>Email already exists. Please login</h4>}
        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        <Link to="/login">
          <h4>or log in using</h4>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

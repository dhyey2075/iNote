import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import noteContext from "./../context/notes/noteContext";
const Note = () => {
  
  useEffect(() => {

    if(token==="" || !token){
      setToken(sessionStorage.getItem("token"));
    }
    sessionStorage.setItem("token", token);
    fetchNotes();
  }, []);
  useEffect(() => {
    
    sessionStorage.setItem("token", token); 
  })
  

  let con = useContext(noteContext);
  let { notes, setNotes, isLoading, setIsLoading, token, setToken } = con;
  const [noteId, setNoteId] = useState({});
  const [form, setForm] = useState({ title: "", description: "", tag: "" });
  const [exists, setExists] = useState(token?true:false);
  const [update, setUpdate] = useState(false);
  const [add, setAdd] = useState(false);

  async function fetchNotes() {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      console.log(token);
      const json = await res.json();
      console.log(json);
      setIsLoading(false);
      setNotes(json);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching notes:", error);
    }
  }

  // useEffect(() => {
  //   console.log("Refresh")
  //   console.log("refresh local ",localStorage.getItem("token"));
  //   fetchNotes();
  //   console.log("refresh local2 ",localStorage.getItem("token"));
  // }, [setIsLoading]);

  const handleChange = (e) => {
    // console.log("target:",e.target)
    const { name, value } = e.target;
    // console.log("name:", name)
    // console.log("value:", value)
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(form)
      let url = "http://localhost:3000/api/notes/updatenote/";
      url = url + noteId;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      // console.log(json)
      setNotes(notes.push(json));
      console.log(notes);
      fetchNotes();
      // Clear the form after submission
      setForm({ title: "", description: "", tag: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    }
    setUpdate(false);
  };
  const handleEdit = async (e) => {
    setUpdate(true);
    setNoteId(e.target.id);
    console.log(noteId);
  };
  const handleDelete = async (e) => {
    setIsLoading(true);
    console.log(e.target.id);
    console.log(token);
    let url = "http://localhost:3000/api/notes/deletenode/";
    let id = e.target.id;
    let fetchURL = url + id;
    console.log(fetchURL);
    try {
      let res = await fetch(
        fetchURL, // Corrected URL
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      setIsLoading(false);
      fetchNotes();
      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const handleAddNote = async (e) => {
    setAdd(true)
    setForm({title:"", description:"", tag:""})
    let url = "http://localhost:3000/api/notes/addnote";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    // console.log(json)
    setNotes([...notes, json]);
    console.log(notes);
    fetchNotes();
    setForm({ title: "", description: "", tag: "" });
    setTimeout(() => {
      setUpdate(true);
    }, 2000);
  };
  const handleaddclick = (e) => {
    setAdd(true);
    setUpdate(false);
    setForm({ title: "", description: "", tag: "" });
  }
  return (
    <div className="container">
      {/* {!token && (
        <>
          <h1 className="mx-4">Please Login or Sign up</h1>
          <Link to="/signup">
            <button type="button" className="mx-2 btn btn-primary">
              Sign Up
            </button>
          </Link>
          <Link to="/login">
            <button type="button" className="mx-2 btn btn-primary">
              Login
            </button>
          </Link>
        </>
      )} */}
      <button
        type="button"
        className="btn btn-primary my-4"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={handleAddNote}
      >
        Add Note
      </button>
      <h2>Your Notes</h2>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="container">
      {!token && (<>
        <h1 className="mx-4">Please Login or Sign up</h1>
        <Link to="/signup"><button type="button" className="mx-2 btn btn-primary">Sign Up</button></Link>
        <Link to="/login"><button type="button" className="mx-2 btn btn-primary">Login</button></Link>
      </>)}
      <button
        type="button"
        className="btn btn-primary my-4"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={handleaddclick}
      >
        Add Note
      </button>
      <h2>Your Notes</h2>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form method="PUT" className="container" onSubmit={handleSubmit}>
              <div className="d-flex conatiner modal-body">
                <div className="mb-3">
                  <label htmlFor="title">Title</label>
                  <br />
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={form.title}
                    onChange={handleChange}
                    minlength="3"
                  />
                  <br />
                  <br />
                  <label htmlFor="description">Description</label>
                  <br />
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={form.description}
                    onChange={handleChange}
                    minlength="5"
                  />
                  <br />
                  <br />
                  <label htmlFor="tag">Tag</label>
                  <br />
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    value={form.tag} 
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                {update && (<button type="submit" className="btn btn-primary">
                  Update Note
                </button>)}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddNote}
                >
                  Add Note
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      {isLoading && <h4>Loading...</h4>}
      {token!=="" && !isLoading && notes.length > 0
        ? notes.map((note) => {
            return (
              <div key={note._id} className="d-inline-flex p-2">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body" style={{ height: "18em" }}>
                    <h3 className="card-title">{note.title}</h3>
                    <h5 className="card-subtitle mb-2 text-muted">
                      tag : {note.tag}
                    </h5>
                    <p className="card-text">
                      {note.description.substring(0, 85)}
                      {note.description.length > 87 ? "..." : ""}
                    </p>
                    <p>Added on : {note.date.split("T")[0]}</p>
                    <span>
                      <button
                        className="mx-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i
                          id={note._id}
                          className="edit fa-solid fa-pen-to-square"
                          onClick={handleEdit}
                        ></i>
                      </button>
                    </span>
                    <span>
                      <button className="mx-2">
                        <i
                          id={note._id}
                          className="clear mx-1 fa-solid fa-trash"
                          onClick={handleDelete}
                        ></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : !isLoading && <h4>No notes available.</h4>}
    </div>
      </div>
      <br />
      {isLoading && <h4>Loading...</h4>}
      {token !== "" && !isLoading && notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="d-inline-flex p-2">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body" style={{ height: "18em" }}>
                <h3 className="card-title">{note.title}</h3>
                <h5 className="card-subtitle mb-2 text-muted">tag : {note.tag}</h5>
                <p className="card-text">{note.description.substring(0, 85)}{note.description.length > 87 ? "..." : ""}</p>
                <p>Added on : {note.date.split("T")[0]}</p>
                <span>
                  <button className="mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(note._id)}>
                    <i className="edit fa-solid fa-pen-to-square"></i>
                  </button>
                </span>
                <span>
                  <button className="mx-2" onClick={() => handleDelete(note._id)}>
                    <i className="clear mx-1 fa-solid fa-trash"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        !isLoading && <h4>No notes available.</h4>
      )}
    </div>
  );
};


export default Note;

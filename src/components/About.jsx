import React from 'react';
import Navbar from './Navbar';

const About = () => {
  return (
    <div className="About">
      <Navbar />
      <h1 className="About-title">About iNoteBook</h1>
      <p className="About-description">
        iNoteBook is a cloud-based note-taking service that allows multiple users to securely store their notes.
        Built using the MERN stack (MongoDB, Express, React, Node.js), it provides a seamless experience for users to
        log in, create, update, and delete notes. All notes are securely stored in the cloud, ensuring they are accessible
        from anywhere, at any time.
      </p>
      <ul className="About-features">
        <li>Secure cloud storage for your notes</li>
        <li>Support for multiple users</li>
        <li>Login and logout functionality</li>
        <li>Real-time updates</li>
        <li>Built with MongoDB, Express, React, and Node.js</li>
      </ul>
    </div>
  );
}

export default About;

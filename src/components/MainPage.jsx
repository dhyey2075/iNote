import React from 'react';
import LoginButton from './LoginButton.jsx';

function MainPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to iNoteBook</h1>
        <p className="App-description">Your personal cloud-based note-taking service.</p>
        <div className="App-buttons">
          <button className="App-button login"><a href="/login">Login</a></button>
          <button className="App-button signup"><a href="/signup">SignUp</a></button>
        </div>
      </header>
    </div>
  );
}

export default MainPage;

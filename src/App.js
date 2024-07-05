import React from "react";
import Joke from "./components/Joke";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Joke Generator</h1>
      </header>
      <main>
        <Joke />
      </main>
    </div>
  );
}

export default App;

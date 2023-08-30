import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  function handleChange(event) {
    setName(event.target.value);
  }
  const [headName, setHeadName] = useState("");
  function handleClick(event) {
    setHeadName(name);
    event.preventDefault();
  }
  return (
    <div className="container">
      <h1>Hello {headName}</h1>
      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

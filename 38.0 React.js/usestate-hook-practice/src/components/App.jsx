import React, { useState } from "react";

function App() {
  setInterval(updateTime, 1000);
  const [time, setTime] = useState("TIME");
  function updateTime() {
    setTime(new Date().toLocaleTimeString("it-IT"));
  }
  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;

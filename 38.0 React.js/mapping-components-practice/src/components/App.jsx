import React from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";
//1. Create entry component
//2. Create props to replace hardcoded data
//3. Map through the emojipedia array and render Entry components

function CreateEntry(item) {
  return (
    <Entry
      key={item.id}
      emoji={item.emoji}
      name={item.name}
      meaning={item.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(CreateEntry)};</dl>
    </div>
  );
}

export default App;

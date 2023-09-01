import { useState } from "react"
import {v4} from "uuid"

const Edit = ({ add, submittingStatus}) => {
  const [note, setNote] = useState("");
  function noteChange(e) {
    setNote(e.target.value);
  }

  const [date, setDate] = useState("");
  function dateChange(e) {
    setDate(e.target.value);
  }

  const [time, setTime] = useState("");
  function timeChange(e) {
    setTime(e.target.value);
  }

  console.log(note, date, time);

  function addItem() {
    submittingStatus.current = true;
    add(function (prev) {
      return [{ id: v4(), note, date, time },...prev];
    });
  }

  return (
    <div>
      <h1>Memo</h1>
      <p>Event: </p>
      <input type="text" value={note} onChange={noteChange} />
      <p>Date: </p>
      <input type="date" value={date} onChange={dateChange} />
      <p>Time: </p>
      <input type="time" value={time} onChange={timeChange} />
      <button onClick={addItem} className="add">
        Add
      </button>
    </div>
  );
};

export default Edit;

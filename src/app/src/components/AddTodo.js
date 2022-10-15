import React, { useState } from "react";
import Api from "../api/Api";

const AddTodo = () => {
  const initialTask = {
    id: null,
    title: "",
  };
  const [task, setTask] = useState(initialTask);
  const [fetch, setFetch] = useState(false);

  const handlechange = (e) => {
    setTask({ ...task, todo: e.target.value });
    console.log("handle change:" + task);
  };
  const handleSubmit = (e) => {
    Api.create(task);
    setTask(initialTask);
    setFetch(!fetch);
  };
  return (
    <div>
      <h1>Create a ToDo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ToDo: </label>
          <input
            type="text"
            onChange={(e) => handlechange(e)}
            value={task.todo}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <button>Add ToDo!</button>
        </div>
      </form>
    </div>
  );
};
export default AddTodo;
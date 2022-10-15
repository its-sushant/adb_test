import React, { useState, useEffect } from "react";
import Api from "../api/Api";

const GetTodo = () => {
  const [tasks, setTasks] = useState([]);

  const fetchtodo = () => {
    Api
    .getAll()
      .then((response) => {
        setTasks(response.data);
        console.log("fetched data ...");
      })
      .catch(console.log("error"));
  };

  useEffect(() => {
    fetchtodo();
  }, []);

  return (
    <div>
      {tasks.map((task, index) => (
        <div className="task" key={index}>
          <div style={{ flex: 20 }}>{task.todo}</div>
        </div>
      ))}
    </div>
  );
};

export default GetTodo;
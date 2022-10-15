import React from "react";
import "./App.css";

import Header from "./components/Header";
import GetTodo from "./components/GetTodo";
import AddTodo from "./components/AddTodo";

export function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <GetTodo />
        <AddTodo />
      </div>
    </div>
  );
}

export default App;
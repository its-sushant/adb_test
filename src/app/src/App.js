import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

import Header from './Header';


export function App() {
  const initialTask={
    id:null,
    todo:""
  }
  const [tasks,setTasks]=useState([])
  const [task,setTask]=useState(initialTask)
  const [fetch,setFetch]=useState(false)
  
  useEffect(() => {
      axios.get('http://localhost:8000/todos/')
      .then(
          response=>{
              
              setTasks(response.data)
              console.log('fetched data ...')
          }
      )
      .catch(
          console.log("error")

      )

  },[fetch])

  const handlechange=(e)=>{
    setTask({...task,
            todo:e.target.value,
            
         })
     console.log('handle change:'+ task)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:8000/todos/',task);
    setTask(initialTask)
    setFetch(!fetch)

  }

  return (
    <div className="App">
      <div>
        <Header />
        {tasks.map((task,index)=>( 
            <div className="task" key={index}>
                <div style={{flex:20}}>{task.todo}</div>
            </div>
        ))}
      </div>
      <div>
        <h1>Create a ToDo</h1>
          <form onSubmit={ handleSubmit }>
          <div>
            <label>ToDo: </label>
            <input type="text" onChange={e=>handlechange(e)} value={task.todo}/>
          </div>
          <div style={{"marginTop": "5px"}}>
                <button>Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import {uuidv4} from 'uuidv4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const[todos,setTodos] = useState([]);
  const todonNameRef = useRef();

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[]);

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete
    setTodos(newTodos);
  }

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    
    const name = todonNameRef.current.value
    if (name === "") return
    //console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todonNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }

  return (
    <>
    <h1>Todo List:</h1>
    <TodoList todos = {todos} toggleTodo={toggleTodo} />
    <input ref={todonNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed List</button>
    <div>{todos.filter(todo => !todo.complete).length}left to do</div>
    </>
    
  );
    
}

export default App;

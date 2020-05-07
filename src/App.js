import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'

const Local_Storage_Key = 'todoApp.todos'

function App() {
  const[todos, setTodos] = useState([])
  const todoNameRef = useRef()


//START- SAVES DATA EVEN WHEN PAGE IS REFRESHED
useEffect(()=>{
  const storedTodos = JSON.parse(localStorage.getItem(Local_Storage_Key))
  if (storedTodos) setTodos(storedTodos)
},[])

useEffect(()=>{
  localStorage.setItem(Local_Storage_Key, JSON.stringify(todos))
}, [todos])
//END- SAVES DATA EVEN WHEN PAGE IS REFRESHED


// START- CHECK BOX FOR TOGGLING
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
//END- CHECK BOX FOR TOGGLING

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: random, name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
  <div>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type ='text' />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </div>
  )
}


export default App;

import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {RemoveScrollBar} from 'react-remove-scroll-bar';



const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
    }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }
  
  function handleClearTodo(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  return (

    <>
    <RemoveScrollBar />
    <Container>
    <div class="row d-flex justify-content-center">
    <div class="col-md-10 col-lg-6">
    <Container className="bg-light mt-5 rounded-3 shadow-lg w-90 g-0">

    <h1 class="text-center pt-3">Todo List</h1>

    <form>

    <div class="mb-3 text-center">

    <div class="form-group">
    <input class="w-50 rounded-pill p-2" ref={todoNameRef} type="text" />

    <button className="btn btn-primary rounded-pill py-2 fs-3" onClick={handleAddTodo}>+</button> 
    <div class="form-text">{todos.filter(todo => !todo.complete).length} remain</div>
    </div>
    
    </div>
    <div class="text-center mb-4">
    <h6 className="pl-2"> <TodoList todos={todos} toggleTodo={toggleTodo}/> </h6>
    </div>
    <hr></hr>
    <div className="text-center pb-3">
    <button className="btn btn-lg btn-primary rounded-pill m-1"  onClick={handleClearTodo}>Clear Completed Todos</button>
    </div>
   

    </form>

    </Container>
    </div>
    </div>
    </Container>
    </>
  );
}

export default App;

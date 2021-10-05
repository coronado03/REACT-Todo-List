import React from 'react'

export default function TodoList({ todo, toggleTodo }) {
  
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (

        <div>
            <label>
            <input className="mr-2" type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}
            </label>
        </div>
    )
}

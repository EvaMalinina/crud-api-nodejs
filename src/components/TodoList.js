import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDeleted, onToggleDone}) => {

  const elements = todos.map((item) =>{

    const { id, ...itemPros } = item;

    return (
      <li key={ id } className="list__item">
        <TodoItem 
          {...itemPros} 
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return (
    <ul className="list">
      { elements }
    </ul>
  )
}

export default TodoList;
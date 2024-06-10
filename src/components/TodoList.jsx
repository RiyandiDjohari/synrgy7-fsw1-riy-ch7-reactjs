import React from "react";

const TodoList = ({ todos }) => {
  return (
    <>
      {todos ? (
        <ul>
          {todos?.map((todo, index) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TodoList;
